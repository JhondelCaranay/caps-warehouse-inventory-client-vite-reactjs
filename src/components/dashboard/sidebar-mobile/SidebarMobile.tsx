import styles from "./SidebarMobile.module.scss";
import { ROLES, SidebarProps } from "../../../types";
import { AccountCircleOutlined, ExitToApp, PeopleOutline } from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { logOut } from "../../../app/features/auth/authSlice";
import {
  ADMINS_ONLY,
  ENGINEER_ONLY,
  EngineerLinks,
  MainLinks,
  controllerLinks,
  CONTROLLER_ONLY,
  adminsLinks,
} from "../../../config/utils/constants";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
  return isActive ? "active" : "";
};

const SidebarMobile = ({ toggleSidebar, setToggleSidebar }: SidebarProps) => {
  const { role } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // confirm logout
    if (!window.confirm("Are you sure you want to logout?")) return;
    dispatch(logOut());
    navigate("/login");
  };

  const sideBarToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <>
      <div
        className={
          toggleSidebar ? `${styles.sidebarMobile}` : `${styles.sidebarMobile} ${styles.hidden}`
        }
      >
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

            {CONTROLLER_ONLY.includes(role as ROLES) && (
              <>
                {controllerLinks.map((link) => (
                  <NavLink to={link.to} className={navLinkStyles} key={link.text}>
                    <li className={styles.icon} onClick={sideBarToggle}>
                      {link.icon}
                      <span>{link.text}</span>
                    </li>
                  </NavLink>
                ))}
              </>
            )}

            {ADMINS_ONLY.includes(role as ROLES) && (
              <>
                {adminsLinks.map((link) => (
                  <NavLink to={link.to} className={navLinkStyles} key={link.text}>
                    <li className={styles.icon} onClick={sideBarToggle}>
                      {link.icon}
                      <span>{link.text}</span>
                    </li>
                  </NavLink>
                ))}
              </>
            )}

            {ENGINEER_ONLY.includes(role as ROLES) && (
              <>
                {EngineerLinks.map((link) => (
                  <NavLink to={link.to} className={navLinkStyles} key={link.text}>
                    <li className={styles.icon} onClick={sideBarToggle}>
                      {link.icon}
                      <span>{link.text}</span>
                    </li>
                  </NavLink>
                ))}
              </>
            )}

            <p className={styles.title}>USER</p>
            <li className={styles.icon} onClick={sideBarToggle}>
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
      <div
        className={toggleSidebar ? `${styles.modalBackdrop}` : ""}
        onClick={() => setToggleSidebar(false)}
      ></div>
    </>
  );
};
export default SidebarMobile;
