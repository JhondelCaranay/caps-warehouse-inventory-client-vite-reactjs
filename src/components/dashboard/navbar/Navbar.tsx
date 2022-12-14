import "./navbar.scss";
import { NavbarProps } from "../../../types";
import {
  ChatBubbleOutlineOutlined,
  DarkModeOutlined,
  MenuOutlined,
  NotificationsNoneOutlined,
} from "@mui/icons-material";
const Navbar = ({ toggleSidebar, setToggleSidebar }: NavbarProps) => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <div className="menu" onClick={() => setToggleSidebar(!toggleSidebar)}>
            <MenuOutlined className="icon" />
          </div>
          {/* <div className="search">
						<input type="text" placeholder="Search..." />
						<SearchOutlined />
					</div> */}
        </div>
        <div className="items">
          {/* <div className="item">
						<LanguageOutlined className="icon" />
						English
					</div> */}
          <div className="item">
            <DarkModeOutlined
              className="icon"
              // onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          {/* <div className="item">
						<FullscreenExitOutlined className="icon" />
					</div> */}
          <div className="item">
            <NotificationsNoneOutlined className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlined className="icon" />
            <div className="counter">2</div>
          </div>

          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
