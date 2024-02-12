import { useState, useEffect, useRef, useContext } from 'react';

import ButtonComponent from '../ButtonComponent';
import EPGChannelsComponent from './EPGChannelsComponent';
import EPGSchedulesComponent from './EPGSchedulesComponent';
import EPGCalendarComponent from './EPGCalendarComponent';
import { UtilsContext } from '../../context/UtilsContext';

interface EPGTableProps {
	data: app.EPGData;
	loading: boolean;
	error: boolean;
}

const EPGTableComponent = ({ data, loading, error }: EPGTableProps) => {
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

	const [currentTimeOnPixels, setCurrentTimeOnPixels] = useState(
		getCurrentTimeOnPixels()
	);

	const [scheduleRefChanged, setScheduleRefChanged] = useState(false);

	useEffect(() => {
		setInterval(() => {
			const pixels = getCurrentTimeOnPixels();
			setCurrentTimeOnPixels(pixels);
		}, 60000);
	}, []);

	useEffect(() => {
		moveToCurrentTimeOnCalendar();
		moveToCurrentTimeOnSchedule();
	}, [scheduleRefChanged]);

	const scheduleRef = useRef(null);
	const calendarRef = useRef(null);

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
				<EPGCalendarComponent calendarRef={calendarRef} />
			</div>
			<div className="epg-body">
				<EPGChannelsComponent channels={channels} />

				<EPGSchedulesComponent
					channels={channels}
					setScheduleRefChanged={setScheduleRefChanged}
					scheduleRef={scheduleRef}
					currentTimeOnPixels={currentTimeOnPixels}
				/>

				<ButtonComponent
					title={'Now'}
					onClick={handleButtonClick}
					classNames="epg-btn-live"
				/>
			</div>
		</div>
	);
};

export default EPGTableComponent;
