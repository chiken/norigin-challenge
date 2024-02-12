import { useParams } from 'react-router-dom';
import { useContext } from 'react';

import { useFetchProgram } from '../hooks/useFetchProgram';
import { UtilsContext } from '../context/UtilsContext';
import Button from '../components/Button';

const ProgramDetailContainer = () => {
	const { getAssetUrlFromPublic } = useContext(UtilsContext);
	const { id } = useParams();

	const { data, loading, error } = useFetchProgram(id);

	if (loading) return <div></div>;

	const {
		title,
		images,
		meta: { year, genres },
		description,
		lastTimePosition,
	} = data;

	const buttonTitle = parseInt(lastTimePosition) > 0 ? 'Resume' : 'Watch';

	return (
		<div className="program-detail">
			<img
				className="program-img"
				src={getAssetUrlFromPublic('movie-img.jpeg')}
				alt={getAssetUrlFromPublic('movie-img.jpeg')}
			/>

			<div className="program-content">
				<span className="title"> {title} </span>
				<span className="year"> Released year: {year} </span>
				<Button
					title={buttonTitle}
					onClick={() => {}}
					classNames="button"
				/>
				<span className="description"> {description} </span>
			</div>
		</div>
	);
};

export default ProgramDetailContainer;
