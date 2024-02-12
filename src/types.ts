namespace app {
	export interface EPGProgram {
		title: string;
		id: string;
		start: string;
		end: string;
	}

	export interface EPGChannel {
		id: string;
		title: string;
		images: { logo: string };
		schedules: EPGProgram[];
	}

	export interface EPGData {
		channels: EPGChannel[];
	}

	export interface ProgramDetail {
		id: string;
		title: string;
		start: string;
		end: string;
		lastTimePosition: string;
		images: {
			icon: string;
		};
		channelId: string;
		channelTitle: string;
		channelImages: {
			logo: string;
		};
		meta: {
			year: string;
			genres: string[];
			cast: PersonDetail[];
			creators: PersonDetail[];
		};
		series: SerieDetail[];
		description: string;
	}

	export interface PersonDetail {
		name: string;
		role: string;
	}
	export interface SerieDetail {
		title: string;
		episodes: EpisodeDetail[];
	}

	export interface EpisodeDetail {
		id: string;
		title: string;
	}
}
