import styles from "./DashboardLayout.module.scss";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { DashNavbar, Sidebar, SidebarMobile } from "../../../components";

const DashLayout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // if window size is greater than 768px, set toggleSidebar to false (close sidebar) on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setToggleSidebar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.dashLayout}>
      {/* left */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>

      {/* right */}
      <div className={styles.outlet}>
        <DashNavbar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
        <Outlet />
      </div>

      {/* sidebar for mobile */}
      <SidebarMobile toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
    </div>
  );
};
export default DashLayout;
