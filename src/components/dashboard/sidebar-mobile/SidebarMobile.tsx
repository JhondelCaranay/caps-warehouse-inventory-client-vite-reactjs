import "./sidebarMobile.scss";
import { SidebarProps } from "../../../types";
import {
	AccountCircleOutlined,
	BrandingWatermarkOutlined,
	CategoryOutlined,
	Construction,
	Dashboard,
	ExitToApp,
	InsertChart,
	LocalShipping,
	MenuOutlined,
	NotificationsNone,
	PaidOutlined,
	PeopleOutline,
	Warehouse,
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
						<NavLink
							to="/dash/transactions"
							className={navLinkStyles}
							onClick={sideBarToggle}
						>
							<li>
								<LocalShipping className="icon" />
								<span>Transactions</span>
							</li>
						</NavLink>
						<NavLink to="/dash/items" className={navLinkStyles} onClick={sideBarToggle}>
							<li>
								<Warehouse className="icon" />
								<span>Items</span>
							</li>
						</NavLink>
						<NavLink
							to="/dash/projects"
							className={navLinkStyles}
							onClick={sideBarToggle}
						>
							<li>
								<Construction className="icon" />
								<span>Projects</span>
							</li>
						</NavLink>
						<NavLink
							to="/dash/category"
							className={navLinkStyles}
							onClick={sideBarToggle}
						>
							<li>
								<CategoryOutlined className="icon" />
								<span>Categories</span>
							</li>
						</NavLink>

						<NavLink
							to="/dash/brands"
							className={navLinkStyles}
							onClick={sideBarToggle}
						>
							<li>
								<BrandingWatermarkOutlined className="icon" />
								<span>Brands</span>
							</li>
						</NavLink>

						<li>
							<PeopleOutline className="icon" />
							<span>Users</span>
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
