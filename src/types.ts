namespace app {
	export interface EPGSchedule {
		title: string;
		id: string;
		start: string;
		end: string;
	}

	export interface EPGChannel {
		id: string;
		title: string;
		images: { logo: string };
		schedules: EPGSchedule[];
	}

	export interface EPGData {
		channels: EPGChannel[];
	}
}
