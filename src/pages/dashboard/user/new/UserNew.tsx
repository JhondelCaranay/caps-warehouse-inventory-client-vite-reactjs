import styles from "./UserNew.module.scss";
import { useTitle } from "../../../../hooks";
import { CreateUserForm } from "../../../../components";
const UserNew = () => {
  useTitle("Spedi: User Create");

  return (
    <div className={styles.userNew}>
      <CreateUserForm />
    </div>
  );
};
export default UserNew;
