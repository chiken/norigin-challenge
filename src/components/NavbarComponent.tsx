import { useContext } from 'react';

import { UtilsContext } from '../context/UtilsContext';

const NavbarComponent = () => {
	const { getAssetUrlFromPublic } = useContext(UtilsContext);
	return (
		<div className="navbar">
			<img
				className="navbar-icon"
				src={getAssetUrlFromPublic('norigin-icon.webp')}
				alt={getAssetUrlFromPublic('norigin-icon.webp')}
			/>
			<span className="navbar-title"> Norigin Challenge </span>
		</div>
	);
};

export default NavbarComponent;
