import { useFetch } from './useFetch';

export const useFetchEPG = () => {
	const { data, loading, error } = useFetch('http://localhost:1337/epg');

	return {
		data: data as app.EPGData | null,
		loading,
		error,
	};
};
