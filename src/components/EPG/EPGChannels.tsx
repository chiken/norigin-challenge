interface EPGChannels {
	channels: app.EPGChannel[];
}

const EPGChannels = ({ channels }: EPGChannels) => {
	const renderChannelLogo = (channel: app.EPGChannel, idx: number) => {
		return (
			<div key={idx} className="epg-channel-item">
				<img
					className="epg-channel-logo"
					src={window.location.origin + '/assets/norigin_logo.jpeg'}
					alt={channel.images.logo}
				/>
			</div>
		);
	};

	return (
		<div className="epg-channels">
			<div className="epg-channel-item"></div>
			{channels.map((channel, idx) => renderChannelLogo(channel, idx))}
		</div>
	);
};

export default EPGChannels;
