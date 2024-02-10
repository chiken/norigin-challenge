import { useEffect } from 'react';
import { useState } from 'react';

export const useFetch = (url: string) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(true);

	const fetchData = () => {
		setLoading(true);

		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setData(data);
				setLoading(false);
			})
			.catch((err) => setError(err));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return { data, loading, error };
};
