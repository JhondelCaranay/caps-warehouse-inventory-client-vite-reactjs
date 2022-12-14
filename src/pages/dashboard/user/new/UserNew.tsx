import CreateUserForm from "../../../../components/forms/user/create/CreateUserForm";
import useTitle from "../../../../hooks/useTitle";
import "./userNew.scss";
const UserNew = () => {
  useTitle("Spedi: User Create");
  return (
    <div className="userNew">
      <CreateUserForm />
    </div>
  );
};
export default UserNew;
