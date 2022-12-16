import "./navbar.scss";
import spediLogo from "./../../../assets/img/logo.jpg";
import { Link, NavLink } from "react-router-dom";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
  return isActive ? "active" : "";
};

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <img src={spediLogo} alt="" className="logo" />
        </Link>
        <h1>Spedi</h1>
      </div>
      <div className="right">
        <ul>
          <NavLink end to="/" className={navLinkStyles}>
            <li>Home</li>
          </NavLink>
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
