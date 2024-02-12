import { MutableRefObject, useContext } from 'react';

import { UtilsContext } from '../../context/UtilsContext';
import EPGSchuduleTime from './EPGSchuduleTime';
import EPGScheduleStick from './EPGScheduleStick';
import EPGProgram from './EPGProgram';

interface EPGChannelProps {
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
}: EPGChannelProps) => {
	const { PIXELS_PER_MIN } = useContext(UtilsContext);
	const scheduleTotalWidth = PIXELS_PER_MIN * 60 * 24;

	const renderEPGSchedules = () => {
		return (
			<>
				{channels.map(({ schedules }, idx) => (
					<div key={idx} className="epg-schedule-row">
						<EPGProgram schedule={schedules} />
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
