import { useEffect, useRef, useState } from 'react';

import EPGSchuduleTime from './EPGSchuduleTime';
import EPGScheduleStick from './EPGScheduleStick';

interface EPGChannels {
	channels: app.EPGChannel[];
	PIXELS_PER_MIN: number;
}

const EPGSchedules = ({ channels, PIXELS_PER_MIN }: EPGChannels) => {
	const scheduleTotalWidth = PIXELS_PER_MIN * 60 * 24;

	const scheduleRef = useRef(null);

	const getCurrentTimeOnPixels = (): number => {
		const date = new Date();
		const hour = date.getHours();
		const min = date.getMinutes();

		return (hour * 60 + min) * PIXELS_PER_MIN;
	};

	const [currentTimeOnPixels, setCurrentTimeOnPixels] = useState(
		getCurrentTimeOnPixels()
	);

	setInterval(() => {
		const pixels = getCurrentTimeOnPixels();
		setCurrentTimeOnPixels(pixels);
	}, 60000);

	useEffect(() => {
		scheduleRef.current.scroll(currentTimeOnPixels, 0);
	}, [currentTimeOnPixels]);

	const getCurrentTime = (): string => {
		const date = new Date();

		const min = ('0' + date.getMinutes()).slice(-2);
		const hour = ('0' + date.getHours()).slice(-2);

		return `${hour}:${min}:${date.getSeconds()}`;
	};

	const calculateTimeDifferenceInMinutes = (schedule: app.EPGSchedule) => {
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

		const differenceTime = (endTimeOnDate - startTimeOnDate) / 60000;

		return {
			scheduleStartTime: startTimeSplit[1],
			scheduleEndTime: endTimeSplit[1],
			differenceTime,
		};
	};

	const renderEPGSchedule = (schedules: app.EPGSchedule[]) => {
		return schedules.map((schedule, idx) => {
			const { scheduleStartTime, scheduleEndTime, differenceTime } =
				calculateTimeDifferenceInMinutes(schedule);

			const currentTime = getCurrentTime();

			const isOnLive =
				scheduleStartTime <= currentTime &&
				scheduleEndTime >= currentTime;
			return (
				<div
					className={`schedule-box ${isOnLive ? 'on-live' : ''}`}
					key={idx}
					style={{ width: PIXELS_PER_MIN * differenceTime }}
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
		<div style={{ width: scheduleTotalWidth }} ref={scheduleRef}>
			<EPGScheduleStick currentTimeOnPixels={currentTimeOnPixels} />
			<EPGSchuduleTime PIXELS_PER_MIN={PIXELS_PER_MIN} />
			{renderEPGSchedules()}
		</div>
	);
};

export default EPGSchedules;
