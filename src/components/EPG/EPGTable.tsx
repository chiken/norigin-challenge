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

	const [currentTimeOnPixels, setCurrentTimeOnPixels] = useState(
		getCurrentTimeOnPixels()
	);

	const scheduleRef = useRef(null);

	setInterval(() => {
		const pixels = getCurrentTimeOnPixels();
		setCurrentTimeOnPixels(pixels);
	}, 60000);

	useEffect(() => {}, [currentTimeOnPixels]);

	const handleGoLiveClick = () => {
		scheduleRef.current.scrollTo(currentTimeOnPixels, 0);
	};

	if (loading) return 'Loading';

	const { channels } = data;

	return (
		<div className="epg-table">
			<div className="epg-header">
				<EPGCalendar />
			</div>
			<div className="epg-body">
				<div className="epg-channels">
					<EPGChannels channels={channels} />
				</div>
				<div className="epg-schedules">
					<EPGSchedules
						channels={channels}
						PIXELS_PER_MIN={PIXELS_PER_MIN}
						scheduleRef={scheduleRef}
						currentTimeOnPixels={currentTimeOnPixels}
					/>
				</div>
				<Button
					title={'Now'}
					onClick={handleGoLiveClick}
					classNames="epg-btn-live"
				/>
			</div>
		</div>
	);
};

export default EPGTable;
