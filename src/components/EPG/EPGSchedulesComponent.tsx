import { MutableRefObject, useContext } from 'react';

import { UtilsContext } from '../../context/UtilsContext';
import EPGSchuduleTimeComponent from './EPGSchuduleTimeComponent';
import EPGScheduleStickComponent from './EPGScheduleStickComponent';
import EPGProgramComponent from './EPGProgramComponent';

interface EPGChannelProps {
	channels: app.EPGChannel[];
	currentTimeOnPixels: number;
	scheduleRef: MutableRefObject<HTMLDivElement>;
	setScheduleRefChanged: any;
}

const EPGSchedulesComponent = ({
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
						<EPGProgramComponent schedule={schedules} />
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
					<EPGScheduleStickComponent
						currentTimeOnPixels={currentTimeOnPixels}
					/>
					<EPGSchuduleTimeComponent />
					{renderEPGSchedules()}
				</div>
			</div>
		</>
	);
};

export default EPGSchedulesComponent;
