type TextErrorProps = {
  children?: string;
  styles?: string;
};

const TextError = ({ children,styles }: TextErrorProps) => {
  return <div className={styles}>{children}</div>;
};

export default TextError;
