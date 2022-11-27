type TextErrorProps = {
	children?: string;
};

const TextError = ({ children }: TextErrorProps) => {
	return <div className="text-error">{children}</div>;
};

export default TextError;
