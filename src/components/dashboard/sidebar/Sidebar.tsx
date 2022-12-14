import "./sidebar.scss";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AccountCircleOutlined,
  BrandingWatermarkOutlined,
  CategoryOutlined,
  Construction,
  Dashboard,
  ExitToApp,
  Hardware,
  LocalShipping,
  PeopleOutline,
  Warehouse,
} from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../types";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../app/features/auth/authSlice";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
  return isActive ? "active" : "";
};

const Sidebar = () => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // confirm logout
    if (!window.confirm("Are you sure you want to logout?")) return;
    dispatch(logOut());
    navigate("/login");
  };

  const ADMIN_AND_CONTROLLER = useMemo(
    () => [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.WAREHOUSE_CONTROLLER],
    []
  );
  const ADMIN = useMemo(() => [ROLES.ADMIN, ROLES.SUPER_ADMIN], []);
  const ENGINEER = useMemo(() => [ROLES.ENGINEER], []);

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Spedi</span>
      </div>

      <hr />

      <div className="center">
        <ul>
          {
            // if admin or super admin
            ADMIN.includes(role as ROLES) && (
              <>
                <p className="title">MAIN</p>
                <NavLink end to="/dash" className={navLinkStyles}>
                  <li>
                    <Dashboard className="icon" />
                    <span>Dashboard </span>
                  </li>
                </NavLink>
              </>
            )
          }

          <p className="title">LISTS</p>
          {
            // if admin or super admin or warehouse controller
            ADMIN_AND_CONTROLLER.includes(role as ROLES) && (
              <>
                <NavLink to="/dash/transactions" className={navLinkStyles}>
                  <li>
                    <LocalShipping className="icon" />
                    <span>Transactions</span>
                  </li>
                </NavLink>
                <NavLink to="/dash/items" className={navLinkStyles}>
                  <li>
                    <Warehouse className="icon" />
                    <span>Items</span>
                  </li>
                </NavLink>
                <NavLink to="/dash/projects" className={navLinkStyles}>
                  <li>
                    <Construction className="icon" />
                    <span>Projects</span>
                  </li>
                </NavLink>
                <NavLink to="/dash/category" className={navLinkStyles}>
                  <li>
                    <CategoryOutlined className="icon" />
                    <span>Categories</span>
                  </li>
                </NavLink>

                <NavLink to="/dash/brands" className={navLinkStyles}>
                  <li>
                    <BrandingWatermarkOutlined className="icon" />
                    <span>Brands</span>
                  </li>
                </NavLink>
              </>
            )
          }

          {
            // id admin or super admin
            ADMIN.includes(role as ROLES) && (
              <>
                <NavLink to="/dash/users" className={navLinkStyles}>
                  <li>
                    <PeopleOutline className="icon" />
                    <span>Users</span>
                  </li>
                </NavLink>
              </>
            )
          }

          {
            // id admin or super admin
            ENGINEER.includes(role as ROLES) && (
              <>
                <NavLink to="/me/items" className={navLinkStyles} state={{ from: "/me/items" }}>
                  <li>
                    <Hardware className="icon" />
                    <span>Items</span>
                  </li>
                </NavLink>

                <NavLink to="/me/transactions" className={navLinkStyles}>
                  <li>
                    <LocalShipping className="icon" />
                    <span>Transactions</span>
                  </li>
                </NavLink>

                <NavLink to="/me/projects" className={navLinkStyles}>
                  <li>
                    <Construction className="icon" />
                    <span>My Projects</span>
                  </li>
                </NavLink>
              </>
            )
          }

          {/* <p className="title">USEFUL</p>
					<li>
						<InsertChart className="icon" />
						<span>Stats</span>
					</li>
					<li>
						<NotificationsNone className="icon" />
						<span>Notifications</span>
					</li> */}
          {/* <p className="title">SERVICE</p>
					<li>
						<SettingsSystemDaydreamOutlined className="icon" />
						<span>System Health</span>
					</li>
					<li>
						<PsychologyOutlined className="icon" />
						<span>Logs</span>
					</li>
					<li>
						<SettingsApplications className="icon" />
						<span>Settings</span>
					</li> */}
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlined className="icon" />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToApp className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          // onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          // onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};
export default Sidebar;
