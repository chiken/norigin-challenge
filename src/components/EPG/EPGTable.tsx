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
	const [scheduleRefChanged, setScheduleRefChanged] = useState(false);

	const {
		PIXELS_PER_MIN,
		CHANNEL_PIXELS_WIDTH,
		DAY_CONTAINER_WIDTH,
		getCurrentTimeOnMin,
	} = useContext(UtilsContext);

	const getCurrentTimeOnPixels = (): number => {
		return getCurrentTimeOnMin() * PIXELS_PER_MIN;
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
				date * DAY_CONTAINER_WIDTH - window.innerWidth / 2;
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
		moveToCurrentTimeOnCalendar();
		moveToCurrentTimeOnSchedule();
	}, [scheduleRefChanged]);

	if (loading) return 'Loading';

	const { channels } = data;

	return (
		<div className="epg-table">
			<div className="epg-header">
				<div className="epg-header-icon">
					<img
						src={window.location.origin + '/assets/start-icon.png'}
						alt={window.location.origin + '/assets/start-icon.png'}
					/>
				</div>
				<EPGCalendar calendarRef={calendarRef} />
			</div>
			<div className="epg-body">
				<EPGChannels channels={channels} />

				<EPGSchedules
					channels={channels}
					setScheduleRefChanged={setScheduleRefChanged}
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
