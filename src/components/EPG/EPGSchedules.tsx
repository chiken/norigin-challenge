import { MutableRefObject, useContext } from 'react';
import { UtilsContext } from '../../context/UtilsContext';

import EPGSchuduleTime from './EPGSchuduleTime';
import EPGScheduleStick from './EPGScheduleStick';

interface EPGChannels {
	channels: app.EPGChannel[];
	currentTimeOnPixels: number;
	scheduleRef: MutableRefObject<HTMLDivElement>;
	setScheduleRefChanged: any;
}

const EPGSchedules = ({
	channels,
	currentTimeOnPixels,
	scheduleRef,
	setScheduleRefChanged,
}: EPGChannels) => {
	const { getCurrentTime, PIXELS_PER_MIN } = useContext(UtilsContext);

	const scheduleTotalWidth = PIXELS_PER_MIN * 60 * 24;

	const calculateScheduleDuration = (schedule: app.EPGSchedule) => {
		const startTimeOnDate: any = new Date(schedule.start);
		const endTimeOnDate: any = new Date(schedule.end);

		const differenceTimeInMinutes =
			(endTimeOnDate - startTimeOnDate) / 60000;

		return {
			scheduleStartTime: schedule.start.slice(11, 18),
			scheduleEndTime: schedule.end.slice(11, 16),
			differenceTimeInMinutes,
		};
	};

	const renderEPGSchedule = (schedules: app.EPGSchedule[]) => {
		return schedules.map((schedule, idx) => {
			const {
				scheduleStartTime,
				scheduleEndTime,
				differenceTimeInMinutes,
			} = calculateScheduleDuration(schedule);

			const currentTime = getCurrentTime();

			const isOnLive =
				scheduleStartTime <= currentTime &&
				scheduleEndTime >= currentTime;

			return (
				<div
					className={`schedule-box ${isOnLive ? 'on-live' : ''}`}
					key={idx}
					style={{ width: PIXELS_PER_MIN * differenceTimeInMinutes }}
				>
					<span className="title"> {schedule.title} </span>
					<span className="time">
						{scheduleStartTime} - {scheduleEndTime}
					</span>
				</div>
			);
		});
	};

	const renderEPGSchedules = () => {
		return (
			<>
				{channels.map((channel, idx) => (
					<div key={idx} className="epg-schedule">
						{renderEPGSchedule(channel.schedules)}
					</div>
				))}
			</>
		);
	};

	return (
		<>
			<div
				className="epg-schedules"
				ref={(el) => {
					scheduleRef.current = el;
					setScheduleRefChanged(true);
				}}
			>
				<div style={{ width: scheduleTotalWidth }}>
					<EPGScheduleStick
						currentTimeOnPixels={currentTimeOnPixels}
					/>
					<EPGSchuduleTime />
					{renderEPGSchedules()}
				</div>
			</div>
		</>
	);
};

export default EPGSchedules;
