import "./dashLayout.scss";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SidebarMobile from "../sidebar-mobile/SidebarMobile";
import Sidebar from "../sidebar/Sidebar";

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

	// watch keyboard events and alert when click ctrl + f12
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.key === "F12") {
				// 123 is f12
				alert("You have pressed ctrl + f12");
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
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
