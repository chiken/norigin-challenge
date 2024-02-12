import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UtilsContext } from '../../context/UtilsContext';

interface EPGProgramProps {
	schedule: app.EPGProgram[];
}

const EPGProgram = ({ schedule }: EPGProgramProps) => {
	const { getCurrentTime, PIXELS_PER_MIN } = useContext(UtilsContext);
	const navigate = useNavigate();

	const calculateProgramDuration = (program: app.EPGProgram) => {
		const startTimeOnDate: any = new Date(program.start);
		const endTimeOnDate: any = new Date(program.end);

		const differenceTimeInMinutes =
			(endTimeOnDate - startTimeOnDate) / 60000;

		return {
			programStartTime: program.start.slice(11, 18),
			programEndTime: program.end.slice(11, 16),
			differenceTimeInMinutes,
		};
	};

	const renderScheduleProgram = (program: app.EPGProgram, idx: number) => {
		const { programStartTime, programEndTime, differenceTimeInMinutes } =
			calculateProgramDuration(program);

		const currentTime = getCurrentTime();

		const isOnLive =
			programStartTime <= currentTime && programEndTime >= currentTime;

		return (
			<div
				className={`epg-program ${isOnLive ? 'on-live' : ''}`}
				key={idx}
				style={{ width: PIXELS_PER_MIN * differenceTimeInMinutes }}
				onClick={() => handleProgramClick(program.id)}
			>
				<span className="title"> {program.title} </span>
				<span className="time">
					{programStartTime} - {programEndTime}
				</span>
			</div>
		);
	};

	const handleProgramClick = (programId: string) => {
		navigate(`program/${programId}`);
	};

	return <>{schedule.map(renderScheduleProgram)}</>;
};

export default EPGProgram;
