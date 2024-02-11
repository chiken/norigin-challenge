import { useState, useEffect, useRef, useContext } from 'react';

import Button from '../Button';
import EPGChannels from './EPGChannels';
import EPGSchedules from './EPGSchedules';
import EPGCalendar from './EPGCalendar';
import { UtilsContext } from '../../context/UtilsContext';

interface EPGTableProps {
	data: app.EPGData;
	loading: boolean;
	error: boolean;
}

const EPGTable = ({ data, loading, error }: EPGTableProps) => {
	const { PIXELS_PER_MIN, CHANNEL_PIXELS_WIDTH, DAY_CONTAINER_WIDTH } =
		useContext(UtilsContext);

	const getCurrentTimeOnPixels = (): number => {
		const date = new Date();
		const hour = date.getHours();
		const min = date.getMinutes();

		return (hour * 60 + min) * PIXELS_PER_MIN;
	};

	const moveToCurrentTimeOnSchedule = () => {
		if (scheduleRef.current !== null) {
			scheduleRef.current.scrollLeft =
				currentTimeOnPixels +
				CHANNEL_PIXELS_WIDTH -
				window.innerWidth / 2;
		}
	};

	const moveToCurrentTimeOnCalendar = () => {
		if (calendarRef.current !== null) {
			const today = new Date();
			const date = today.getDate();

			calendarRef.current.scrollLeft =
				date * DAY_CONTAINER_WIDTH -
				CHANNEL_PIXELS_WIDTH -
				window.innerWidth / 2;
		}
	};

	const handleButtonClick = () => {
		moveToCurrentTimeOnCalendar();
		moveToCurrentTimeOnSchedule();
	};

	setInterval(() => {
		const pixels = getCurrentTimeOnPixels();
		setCurrentTimeOnPixels(pixels);
	}, 60000);

	const [currentTimeOnPixels, setCurrentTimeOnPixels] = useState(
		getCurrentTimeOnPixels()
	);

	const scheduleRef = useRef(null);
	const calendarRef = useRef(null);

	useEffect(() => {
		moveToCurrentTimeOnSchedule();
	}, [scheduleRef.current]);

	if (loading) return 'Loading';

	const { channels } = data;

	return (
		<div className="epg-table">
			<div className="epg-header">
				<EPGCalendar calendarRef={calendarRef} />
			</div>
			<div className="epg-body">
				<EPGChannels channels={channels} />

				<EPGSchedules
					channels={channels}
					scheduleRef={scheduleRef}
					currentTimeOnPixels={currentTimeOnPixels}
				/>

				<Button
					title={'Now'}
					onClick={handleButtonClick}
					classNames="epg-btn-live"
				/>
			</div>
		</div>
	);
};

export default EPGTable;
