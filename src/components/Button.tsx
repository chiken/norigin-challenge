interface ButtonProps {
	title: string;
	onClick: () => void;
	classNames?: string;
}

const Button = ({ title, onClick, classNames }: ButtonProps) => {
	const handleClick = () => {
		onClick();
	};

	return (
		<button className={classNames} onClick={handleClick}>
			{title}
		</button>
	);
};

export default Button;
