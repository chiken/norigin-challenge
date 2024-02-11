import EPGChannels from './EPGChannels';
import EPGSchedules from './EPGSchedules';

interface EPGTableProps {
	data: app.EPGData;
	loading: boolean;
	error: boolean;
}

const PIXELS_PER_MIN = 8;

const EPGTable = ({ data, loading, error }: EPGTableProps) => {
	if (loading) return 'Loading';

	const channels = data.channels;

	return (
		<div className="epg-table">
			<div className="epg-header"></div>
			<div className="epg-body">
				<div className="epg-channels">
					<EPGChannels channels={channels} />
				</div>
				<div className="epg-schedules">
					<EPGSchedules
						channels={channels}
						PIXELS_PER_MIN={PIXELS_PER_MIN}
					/>
				</div>
			</div>
		</div>
	);
};

export default EPGTable;
