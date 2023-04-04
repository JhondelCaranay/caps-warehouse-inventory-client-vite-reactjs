import styles from "./ErrorMessage.module.scss";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className={styles.error}>
      <h1>{message}</h1>
    </div>
  );
};
export default ErrorMessage;
