import { useContext } from 'react';
import { UtilsContext } from '../context/UtilsContext';

interface ImageProps {
	assetName: string;
	classNames: string;
}

const ImageComponent = ({ assetName, classNames }: ImageProps) => {
	const { getAssetUrlFromPublic } = useContext(UtilsContext);

	const url = getAssetUrlFromPublic(assetName);
	return <img className={classNames} src={url} alt={url} />;
};

export default ImageComponent;
