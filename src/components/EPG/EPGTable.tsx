import { useState, useEffect, useRef } from 'react';

import Button from '../Button';
import EPGChannels from './EPGChannels';
import EPGSchedules from './EPGSchedules';
import EPGCalendar from './EPGCalendar';

interface EPGTableProps {
	data: app.EPGData;
	loading: boolean;
	error: boolean;
}

const PIXELS_PER_MIN = 8;

const EPGTable = ({ data, loading, error }: EPGTableProps) => {
	const getCurrentTimeOnPixels = (): number => {
		const date = new Date();
		const hour = date.getHours();
		const min = date.getMinutes();

		return (hour * 60 + min) * PIXELS_PER_MIN;
	};

	const moveToCurrentTimeOnSchedule = () => {
		if (scheduleRef.current !== null) {
			scheduleRef.current.scrollLeft =
				currentTimeOnPixels + 75 - window.innerWidth / 2;
		}
	};

	const moveToCurrentTimeOnCalendar = () => {
		if (calendarRef.current !== null) {
			const today = new Date();
			const date = today.getDate();
			console.log(date);

			calendarRef.current.scrollLeft =
				date * 98 - 75 - window.innerWidth / 2;
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
					PIXELS_PER_MIN={PIXELS_PER_MIN}
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
