import { useParams, useNavigate } from 'react-router-dom';

import { useFetchProgram } from '../hooks/useFetchProgram';
import ButtonComponent from '../components/ButtonComponent';
import ImageComponent from '../components/ImageComponent';

const ProgramDetailContainer = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data, loading, error } = useFetchProgram(id);

	if (loading) return <div></div>;

	const {
		title,
		images,
		meta: { year, genres },
		description,
		lastTimePosition,
	} = data;

	const buttonTitle = parseInt(lastTimePosition) > 0 ? 'RESUME' : 'WATCH';

	return (
		<div className="program-detail">
			<ImageComponent
				assetName="movie-img.jpeg"
				classNames="program-img"
			/>

			<div className="program-content">
				<span className="title"> {title} </span>
				<span className="year"> Released year: {year} </span>
				<ButtonComponent
					title={buttonTitle}
					onClick={() => {}}
					classNames="watch-button"
				/>
				<span className="description"> {description} </span>

				<ButtonComponent
					title="BACK"
					onClick={() => navigate(-1)}
					classNames="back-button"
				/>
			</div>
		</div>
	);
};

export default ProgramDetailContainer;
