import { useContext } from 'react';

import { UtilsContext } from '../../context/UtilsContext';

interface EPGChannels {
	channels: app.EPGChannel[];
}

const EPGChannels = ({ channels }: EPGChannels) => {
	const { getAssetUrlFromPublic } = useContext(UtilsContext);
	const renderChannelLogo = (channel: app.EPGChannel, idx: number) => {
		/*
			For this img we should use channel.imgaes.logo
			but are not working, so changed to a static one
		*/
		return (
			<div key={idx} className="epg-channel-item">
				<img
					className="epg-channel-logo"
					src={getAssetUrlFromPublic('norigin-icon.webp')}
					alt={getAssetUrlFromPublic('norigin-icon.webp')}
				/>
			</div>
		);
	};

	return (
		<div className="epg-channels">
			{channels.map((channel, idx) => renderChannelLogo(channel, idx))}
		</div>
	);
};

export default EPGChannels;
