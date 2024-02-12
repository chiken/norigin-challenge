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
}
