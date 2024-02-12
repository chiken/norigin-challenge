import { useFetch } from '../hooks/useFetch';
import EPGTable from '../components/EPG/EPGTable';

const HomeContainer = () => {
	const { data, loading, error } = useFetch('http://localhost:1337/epg');

	if (loading) return <div></div>;

	return (
		<div className="home">
			<EPGTable data={data} loading={loading} error={error} />
		</div>
	);
};

export default HomeContainer;
