import "./sidebarMobile.scss";
import { ROLES, SidebarProps } from "../../../types";
import {
	AccountCircleOutlined,
	BrandingWatermarkOutlined,
	CategoryOutlined,
	Construction,
	Dashboard,
	ExitToApp,
	Hardware,
	LocalShipping,
	MenuOutlined,
	PeopleOutline,
	Warehouse,
} from "@mui/icons-material";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../../app/features/auth/authSlice";
const navLinkStyles = ({ isActive }: { isActive: boolean }) => {
	return isActive ? "active" : "";
};

const SidebarMobile = ({ toggleSidebar, setToggleSidebar }: SidebarProps) => {
	const { role } = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = () => {
		// confirm logout
		if (!window.confirm("Are you sure you want to logout?")) return;
		dispatch(logOut());
		navigate("/login");
	};

	const ADMIN_AND_CONTROLLER = useMemo(
		() => [ROLES.ADMIN, ROLES.SUPER_ADMIN, ROLES.WAREHOUSE_CONTROLLER],
		[] // only run once
	);
	const ADMIN = useMemo(() => [ROLES.ADMIN, ROLES.SUPER_ADMIN], []);
	const ENGINEER = useMemo(() => [ROLES.ENGINEER], []);

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
						{
							// if admin or super admin
							ADMIN.includes(role as ROLES) && (
								<>
									<p className="title">MAIN</p>
									<NavLink
										end
										to="/dash"
										className={navLinkStyles}
										onClick={sideBarToggle}
									>
										<li>
											<Dashboard className="icon" />
											<span>Dashboard </span>
										</li>
									</NavLink>
								</>
							)
						}

						<p className="title">LISTS</p>
						{
							// if admin or super admin or warehouse controller
							ADMIN_AND_CONTROLLER.includes(role as ROLES) && (
								<>
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
									<NavLink to="/dash/projects" className={navLinkStyles}>
										<li>
											<Construction className="icon" />
											<span>Projects</span>
										</li>
									</NavLink>
									<NavLink to="/dash/category" className={navLinkStyles}>
										<li>
											<CategoryOutlined className="icon" />
											<span>Categories</span>
										</li>
									</NavLink>

									<NavLink to="/dash/brands" className={navLinkStyles}>
										<li>
											<BrandingWatermarkOutlined className="icon" />
											<span>Brands</span>
										</li>
									</NavLink>
								</>
							)
						}

						{
							// id admin or super admin
							ADMIN.includes(role as ROLES) && (
								<>
									<li>
										<PeopleOutline className="icon" />
										<span>Users</span>
									</li>
								</>
							)
						}

						{
							// id admin or super admin
							ENGINEER.includes(role as ROLES) && (
								<>
									<NavLink to="/me/items" className={navLinkStyles}>
										<li>
											<Hardware className="icon" />
											<span>Items</span>
										</li>
									</NavLink>

									<NavLink to="/me/transactions" className={navLinkStyles}>
										<li>
											<LocalShipping className="icon" />
											<span>Transactions</span>
										</li>
									</NavLink>

									<NavLink to="/me/projects" className={navLinkStyles}>
										<li>
											<Construction className="icon" />
											<span>My Projects</span>
										</li>
									</NavLink>
								</>
							)
						}

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

			<div
				className={toggleSidebar ? "modalBackdrop" : ""}
				onClick={() => setToggleSidebar(false)}
			></div>
		</>
	);
};
export default SidebarMobile;
