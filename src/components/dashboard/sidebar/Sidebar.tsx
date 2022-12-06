import "./sidebar.scss";
import { NavLink } from "react-router-dom";
import {
	AccountCircleOutlined,
	BrandingWatermarkOutlined,
	CategoryOutlined,
	Dashboard,
	ExitToApp,
	InsertChart,
	LocalShipping,
	NotificationsNone,
	PersonOutline,
	Store,
	Warehouse,
} from "@mui/icons-material";

const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
	return isActive ? "active" : "";
};

const Sidebar = () => {
	return (
		<div className="sidebar">
			<div className="top">
				<span className="logo">Spedi</span>
			</div>

			<hr />

			<div className="center">
				<ul>
					<p className="title">MAIN</p>
					<NavLink end to="/dash" className={navLinkStyles}>
						<li>
							<Dashboard className="icon" />
							<span>Dashboard </span>
						</li>
					</NavLink>
					<p className="title">LISTS</p>
					<NavLink to="/dash/transactions" className={navLinkStyles}>
						<li>
							<LocalShipping className="icon" />
							<span>Transactions</span>
						</li>
					</NavLink>
					<NavLink to="/dash/items" className={navLinkStyles}>
						<li>
							<Warehouse className="icon" />
							<span>Items</span>
						</li>
					</NavLink>
					<NavLink to="/dash/category" className={navLinkStyles}>
						<li>
							<CategoryOutlined className="icon" />
							<span>Categories</span>
						</li>
					</NavLink>
					{/* <NavLink to="/dash/users" className={navLinkStyles}> */}
					<li>
						<PersonOutline className="icon" />
						<span>Users</span>
					</li>
					{/* </NavLink> */}

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
				<div
					className="colorOption"
					// onClick={() => dispatch({ type: "LIGHT" })}
				></div>
				<div
					className="colorOption"
					// onClick={() => dispatch({ type: "DARK" })}
				></div>
			</div>
		</div>
	);
};
export default Sidebar;
