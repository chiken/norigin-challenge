import { useFetch } from '../hooks/useFetch';
import EPGTableComponent from '../components/EPG/EPGTableComponent';

const HomeContainer = () => {
	const { data, loading, error } = useFetch('http://localhost:1337/epg');

	if (loading) return <div></div>;

	return (
		<div className="home">
			<EPGTableComponent data={data} loading={loading} error={error} />
		</div>
	);
};

export default HomeContainer;
