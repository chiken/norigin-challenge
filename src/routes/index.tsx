import LayoutComponent from '../components/LayoutComponent';
import HomeContainer from '../containers/HomeContainer';

export const router = [
	{
		path: '/',
		element: <LayoutComponent />,
		children: [
			{
				index: true,
				element: <HomeContainer />,
			},
		],
	},
];
