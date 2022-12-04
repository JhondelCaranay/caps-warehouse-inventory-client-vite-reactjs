import "./dashLayout.scss";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../../components/dashboard/sidebar/Sidebar";
import Navbar from "../../../components/dashboard/navbar/Navbar";
import SidebarMobile from "../../../components/dashboard/sidebar-mobile/SidebarMobile";

const DashLayout = () => {
	const [toggleSidebar, setToggleSidebar] = useState(false);

	// watch window size and set toggleSidebar to false if window size is greater than 768px
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
		<div className="dashLayout">
			<div className="sidebar">
				<Sidebar />
			</div>
			<div className="outlet">
				<Navbar toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
				<Outlet />
			</div>
			<SidebarMobile toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />
		</div>
	);
};
export default DashLayout;
