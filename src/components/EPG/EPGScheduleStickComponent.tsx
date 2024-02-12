interface EPGScheduleStickProps {
	currentTimeOnPixels: number;
}

const EPGScheduleStickComponent = ({
	currentTimeOnPixels,
}: EPGScheduleStickProps) => {
	return (
		<div
			style={{ left: currentTimeOnPixels }}
			className="vertical-line"
		></div>
	);
};

export default EPGScheduleStickComponent;
