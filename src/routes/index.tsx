import LayoutComponent from '../components/LayoutComponent';
import HomeContainer from '../containers/HomeContainer';
import ProgramDetailContainer from '../containers/ProgramDetailContainer';

export const router = [
	{
		path: '/',
		element: <LayoutComponent />,
		children: [
			{
				index: true,
				element: <HomeContainer />,
			},
			{
				path: 'program/:id',
				element: <ProgramDetailContainer />,
			},
		],
	},
];
