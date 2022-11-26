import { useEffect } from "react";
import "./publicLayout.scss";
import { Outlet } from "react-router-dom";
import Navbar from "../../public/navbar/Navbar";

const PublicLayout = () => {
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
		<div className="publicLayout">
			<Navbar />
			<Outlet />
		</div>
	);
};
export default PublicLayout;
