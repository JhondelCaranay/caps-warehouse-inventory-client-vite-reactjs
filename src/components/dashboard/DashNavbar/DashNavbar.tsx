import styles from "./Navbar.module.scss";
import { NavbarProps } from "../../../types";
import {
  ChatBubbleOutlineOutlined,
  DarkModeOutlined,
  FullscreenExitOutlined,
  LanguageOutlined,
  MenuOutlined,
  NotificationsNoneOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { useAuth } from "../../../hooks";

const Navbar = ({ toggleSidebar, setToggleSidebar }: NavbarProps) => {
  const { email } = useAuth();
  return (
    <div className={styles.navbar}>
      {/* wrapper */}
      <div className={styles.wrapper}>
        {/* left */}
        <div className={styles.left}>
          {/* menu icon */}
          <div className={styles.menu} onClick={() => setToggleSidebar(!toggleSidebar)}>
            <MenuOutlined className={styles.icon} />
          </div>
          {/* search bar */}
          {/* <div className={styles.search}>
            <input type="text" placeholder="Search..." />
            <SearchOutlined />
          </div> */}
        </div>
        {/* right */}
        <div className={styles.right}>
          {/* icons */}
          {/* <div className={styles.item}>
            <LanguageOutlined className={styles.icon} />
            English
          </div> */}
          {/* <div className={styles.item}>
            <DarkModeOutlined
              className={styles.icon}
              // onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className={styles.item}>
            <FullscreenExitOutlined className={styles.icon} />
          </div>

          <div className={styles.item}>
            <ChatBubbleOutlineOutlined className={styles.icon} />
            <div className="counter">2</div>
          </div> */}
          <div className={styles.item}>
            <NotificationsNoneOutlined className={styles.icon} />
            <div className="counter">1</div>
          </div>
          {/* user avatar */}
          <div className={styles.item}>{email}</div>
          <div className={styles.item}>
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className={styles.avatar}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
