interface EPGScheduleStickProps {
	currentTimeOnPixels: number;
}

const EPGScheduleStick = ({ currentTimeOnPixels }: EPGScheduleStickProps) => {
	return (
		<div
			style={{ left: currentTimeOnPixels }}
			className="vertical-line"
		></div>
	);
};

export default EPGScheduleStick;
