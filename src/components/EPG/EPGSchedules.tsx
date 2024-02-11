import { useContext } from 'react';
import { UtilsContext } from '../../context/UtilsContext';

import EPGSchuduleTime from './EPGSchuduleTime';
import EPGScheduleStick from './EPGScheduleStick';

interface EPGChannels {
	channels: app.EPGChannel[];
	currentTimeOnPixels: number;
	scheduleRef: any;
}

const EPGSchedules = ({
	channels,
	currentTimeOnPixels,
	scheduleRef,
}: EPGChannels) => {
	const { getCurrentTime, PIXELS_PER_MIN } = useContext(UtilsContext);

	const scheduleTotalWidth = PIXELS_PER_MIN * 60 * 24;

	const calculateScheduleDuration = (schedule: app.EPGSchedule) => {
		const startTime = schedule.start.split('+')[0];
		const endTime = schedule.end.split('+')[0];

		const startTimeSplit = startTime.split('T');
		const endTimeSplit = endTime.split('T');

		const startTimeOnDate: any = new Date(
			`${startTimeSplit[0]} ${startTimeSplit[1]}`
		);
		const endTimeOnDate: any = new Date(
			`${endTimeSplit[0]} ${endTimeSplit[1]}`
		);

		const differenceTimeInMinutes =
			(endTimeOnDate - startTimeOnDate) / 60000;

		const scheduleStartTimeSplit = startTimeSplit[1].split(':');
		const scheduleEndTimeSplit = endTimeSplit[1].split(':');

		return {
			scheduleStartTime: `${scheduleStartTimeSplit[0]}:${scheduleStartTimeSplit[1]}`,
			scheduleEndTime: `${scheduleEndTimeSplit[0]}:${scheduleEndTimeSplit[1]}`,
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
		<div className="epg-schedules" ref={scheduleRef}>
			<div style={{ width: scheduleTotalWidth }}>
				<EPGScheduleStick currentTimeOnPixels={currentTimeOnPixels} />
				<EPGSchuduleTime />
				{renderEPGSchedules()}
			</div>
		</div>
	);
};

export default EPGSchedules;
