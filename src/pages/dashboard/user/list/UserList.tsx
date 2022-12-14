import UserDataTable from "../../../../components/dashboard/datatable/user/UserDataTable";
import useTitle from "../../../../hooks/useTitle";
import "./userList.scss";
const UserList = () => {
  useTitle("Spedi: User List");

  return (
    <div className="userList">
      <UserDataTable />
    </div>
  );
};

export default UserList;
