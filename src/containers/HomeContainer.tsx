import { useFetchEPG } from '../hooks/useFetchEPG';
import EPGTable from '../components/EPG/EPGTable';

const HomeContainer = () => {
	const { data, loading, error } = useFetchEPG();

	return (
		<div className="home">
			<EPGTable data={data} loading={loading} error={error} />
		</div>
	);
};

export default HomeContainer;
