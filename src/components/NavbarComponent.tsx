import ImageComponent from './ImageComponent';

const NavbarComponent = () => {
	return (
		<div className="navbar">
			<ImageComponent
				assetName="norigin-icon.webp"
				classNames="navbar-icon"
			/>

			<span className="navbar-title"> Norigin Challenge </span>
		</div>
	);
};

export default NavbarComponent;
