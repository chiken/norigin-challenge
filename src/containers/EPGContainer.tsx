import EPGChannels from '../components/EPGChannels';
import EPGSchedules from '../components/EPGSchedules';

import { useFetchEPG } from '../hooks/useFetchEPG';

const PIXELS_PER_MIN = 8;

const EPGContainer = () => {
	const { data, loading, error } = useFetchEPG();

	if (loading) {
		return <div> Loading </div>;
	}

	const channels = data.channels;

	return (
		<div className="epg-container">
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

export default EPGContainer;
