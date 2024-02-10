interface EPGSchuduleTimeProps {
	PIXELS_PER_MIN: number;
}

const EPGSchuduleTime = ({ PIXELS_PER_MIN }: EPGSchuduleTimeProps) => {
	const generateTimeContainer = () => {
		const containerWidth = PIXELS_PER_MIN * 60;

		return Array(24)
			.fill(null)
			.map((v, i) => (
				<div key={i} className="hour" style={{ width: containerWidth }}>
					{i}:00
				</div>
			));
	};

	return (
		<div
			className="epg-schedule-time"
			style={{ width: PIXELS_PER_MIN * 60 * 24 + 1 }}
		>
			{generateTimeContainer()}
		</div>
	);
};

export default EPGSchuduleTime;
