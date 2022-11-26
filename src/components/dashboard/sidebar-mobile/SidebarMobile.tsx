import "./sidebarMobile.scss";
import { SidebarProps } from "../../../types";
import {
	AccountCircleOutlined,
	BrandingWatermarkOutlined,
	CategoryOutlined,
	Dashboard,
	ExitToApp,
	InsertChart,
	LocalShipping,
	MenuOutlined,
	NotificationsNone,
	PaidOutlined,
	PersonOutline,
	Store,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
	return isActive ? "active" : "";
};

const SidebarMobile = ({ toggleSidebar, setToggleSidebar }: SidebarProps) => {
	const sideBarToggle = () => {
		setToggleSidebar(!toggleSidebar);
	};
	return (
		<>
			<div className={toggleSidebar ? "sidebarMobile" : "sidebarMobile hidden"}>
				<div className="top">
					<MenuOutlined className="icon close" onClick={sideBarToggle} />
					<span className="logo">Spedi</span>
				</div>

				<hr />

				<div className="center">
					<ul>
						<p className="title">MAIN</p>
						<NavLink end to="/dash" className={navLinkStyles} onClick={sideBarToggle}>
							<li>
								<Dashboard className="icon" />
								<span>Dashboard</span>
							</li>
						</NavLink>
						<p className="title">LISTS</p>
						<NavLink to="/dash/users" className={navLinkStyles} onClick={sideBarToggle}>
							<li>
								<PersonOutline className="icon" />
								<span>Users</span>
							</li>
						</NavLink>
						<NavLink
							to="/dash/products"
							className={navLinkStyles}
							onClick={sideBarToggle}
						>
							<li>
								<Store className="icon" />
								<span>Products</span>
							</li>
						</NavLink>
						<li>
							<PaidOutlined className="icon" />
							<span>Transactions</span>
						</li>
						<li>
							<CategoryOutlined className="icon" />
							<span>Categories</span>
						</li>
						<li>
							<BrandingWatermarkOutlined className="icon" />
							<span>Brands</span>
						</li>
						<li>
							<LocalShipping className="icon" />
							<span>Projects</span>
						</li>
						<p className="title">USEFUL</p>
						<li>
							<InsertChart className="icon" />
							<span>Stats</span>
						</li>
						<li>
							<NotificationsNone className="icon" />
							<span>Notifications</span>
						</li>
						{/* <p className="title">SERVICE</p>
					<li>
						<SettingsSystemDaydreamOutlined className="icon" />
						<span>System Health</span>
					</li>
					<li>
						<PsychologyOutlined className="icon" />
						<span>Logs</span>
					</li>
					<li>
						<SettingsApplications className="icon" />
						<span>Settings</span>
					</li> */}
						<p className="title">USER</p>
						<li>
							<AccountCircleOutlined className="icon" />
							<span>Profile</span>
						</li>
						<li>
							<ExitToApp className="icon" />
							<span>Logout</span>
						</li>
					</ul>
				</div>
				<div className="bottom">
					{/* <div className="colorOption" onClick={() => dispatch({ type: "LIGHT" })}></div> */}
					{/* <div className="colorOption" onClick={() => dispatch({ type: "DARK" })}></div> */}
				</div>
			</div>

			<div
				className={toggleSidebar ? "modalBackdrop" : ""}
				onClick={() => setToggleSidebar(false)}
			></div>
		</>
	);
};
export default SidebarMobile;
