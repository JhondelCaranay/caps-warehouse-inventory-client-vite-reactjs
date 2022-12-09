import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../types";
const AuthNotAllowed = () => {
	const location = useLocation();
	const { role } = useAuth();

	if (role === ROLES.ADMIN || role === ROLES.SUPER_ADMIN) {
		return <Navigate to="/dash" state={{ from: location }} replace />;
	}
	if (role === ROLES.WAREHOUSE_CONTROLLER) {
		return <Navigate to="/dash/transactions" state={{ from: location }} replace />;
	}
	if (role === ROLES.ENGINEER) {
		return <Navigate to="/me" state={{ from: location }} replace />;
	} else {
		return <Outlet />;
	}
};
export default AuthNotAllowed;
