import { useFetch } from './useFetch';

export const useFetchProgram = (programId: string) => {
	const { data, loading, error } = useFetch(
		`http://localhost:1337/program/${programId}`
	);

	return {
		data: data as app.ProgramDetail | null,
		loading,
		error,
	};
};
