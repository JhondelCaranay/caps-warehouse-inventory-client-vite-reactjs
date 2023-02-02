import styles from "./Sidebar.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { AccountCircleOutlined, ExitToApp, PeopleOutline } from "@mui/icons-material";
import useAuth from "../../../hooks/useAuth";
import { ROLES } from "../../../types";
import { useDispatch } from "react-redux";
import { logOut } from "../../../app/features/auth/authSlice";
import {
  ADMINS_ONLY,
  ADMIN_CONTROLLER_ONLY,
  EngineeLinks,
  ENGINEER_ONLY,
  ListLinks,
  MainLinks,
} from "../../../config/utils/constants";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
  return isActive ? `${styles.active}` : "";
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

  return (
    <div className={styles.sidebar}>
      {/* top */}
      <div className={styles.top}>
        <span className={styles.logo}>Spedi</span>
      </div>

      <hr />

      {/* center */}
      <div className={styles.center}>
        <ul>
          {ADMINS_ONLY.includes(role as ROLES) && (
            <>
              <p className={styles.title}>MAIN</p>
              <NavLink end to={MainLinks.to} className={navLinkStyles}>
                <li className={styles.icon}>
                  {MainLinks.icon}
                  <span>{MainLinks.text}</span>
                </li>
              </NavLink>
            </>
          )}
          <p className={styles.title}>LISTS</p>

          {ADMIN_CONTROLLER_ONLY.includes(role as ROLES) && (
            <>
              {ListLinks.map((link) => (
                <NavLink to={link.to} className={navLinkStyles} key={link.text}>
                  <li className={styles.icon}>
                    {link.icon}
                    <span>{link.text}</span>
                  </li>
                </NavLink>
              ))}
            </>
          )}

          {ADMINS_ONLY.includes(role as ROLES) && (
            <>
              <NavLink to="/dash/users" className={navLinkStyles}>
                <li className={styles.icon}>
                  <PeopleOutline />
                  <span>Users</span>
                </li>
              </NavLink>
            </>
          )}

          {ENGINEER_ONLY.includes(role as ROLES) && (
            <>
              {EngineeLinks.map((link) => (
                <NavLink to={link.to} className={navLinkStyles} key={link.text}>
                  <li className={styles.icon}>
                    {link.icon}
                    <span>{link.text}</span>
                  </li>
                </NavLink>
              ))}
            </>
          )}

          <p className={styles.title}>USER</p>
          <li className={styles.icon}>
            <AccountCircleOutlined />
            <span>Profile</span>
          </li>
          <li onClick={handleLogout} className={styles.icon}>
            <ExitToApp />
            <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* bottom */}
      <div className={styles.bottom}>
        <div
          className={styles.colorOption}
          // onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className={styles.colorOption}
          // onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};
export default Sidebar;
