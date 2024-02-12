import { useContext } from 'react';
import { UtilsContext } from '../../context/UtilsContext';

const EPGSchuduleTime = () => {
	const { PIXELS_PER_MIN } = useContext(UtilsContext);

	const containerWidth = PIXELS_PER_MIN * 60;

	const generateTimeContainer = () => {
		return Array(24)
			.fill(null)
			.map((v, i) => (
				<div key={i} className="hour" style={{ width: containerWidth }}>
					{i}:00
				</div>
			));
	};

	return <div className="epg-schedule-time">{generateTimeContainer()}</div>;
};

export default EPGSchuduleTime;
