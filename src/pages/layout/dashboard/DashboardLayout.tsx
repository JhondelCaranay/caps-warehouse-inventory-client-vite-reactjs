import styles from "./DashboardLayout.module.scss";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ChangePassword, DashNavbar, Sidebar, SidebarMobile } from "../../../components";
import { useGetMyProfileQuery } from "../../../app/services/user/userApiSlice";

const DashLayout = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const { data: user } = useGetMyProfileQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

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

      {
        // if user isNeedChangePassword is true, redirect to change password page
        user && user.isNeedChangePassword === true && <ChangePassword user={user} />
      }
    </div>
  );
};
export default DashLayout;
