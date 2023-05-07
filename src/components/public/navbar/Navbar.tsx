import styles from "./Navbar.module.scss";
import spediLogo from "./../../../assets/img/logo.jpg";
import { Link, NavLink } from "react-router-dom";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
  return isActive ? `${styles.active}` : "";
};

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <Link to="/">
          <img src={spediLogo} alt="" className={styles.logo} />
        </Link>
        <h1>Spedi</h1>
      </div>
      <div className={styles.right}>
        <ul>
          <NavLink end to="/" className={navLinkStyles}>
            <li>Home</li>
          </NavLink>
          <a href="#about">
            <li>About Us</li>
          </a>
          <a href="#service">
            <li>Services</li>
          </a>
          <a href="#contact">
            <li>Contact Us</li>
          </a>
          <NavLink to="/login" className={navLinkStyles}>
            <li>Login</li>
          </NavLink>

          {/* <NavLink to="/register" className={navLinkStyles}>
						<li>Register</li>
					</NavLink>
					<NavLink to="/logout" className={navLinkStyles}>
						<li>Logout</li>
					</NavLink> */}
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
