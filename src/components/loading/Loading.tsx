import { PulseLoader } from "react-spinners";
import styles from "./Loading.module.scss";
const Loading = () => {
  return (
    <div className={styles.loading}>
      <PulseLoader color={"#1976d2"} />
    </div>
  );
};
export default Loading;
