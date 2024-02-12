import ImageComponent from '../ImageComponent';

interface EPGChannels {
	channels: app.EPGChannel[];
}

const EPGChannelsComponent = ({ channels }: EPGChannels) => {
	const renderChannelLogo = (channel: app.EPGChannel, idx: number) => {
		/*
			For this img we should use channel.imgaes.logo
			but are not working, so changed to a static one
		*/
		return (
			<div key={idx} className="epg-channel-item">
				<ImageComponent
					assetName="norigin-icon.webp"
					classNames="epg-channel-logo"
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

export default EPGChannelsComponent;
