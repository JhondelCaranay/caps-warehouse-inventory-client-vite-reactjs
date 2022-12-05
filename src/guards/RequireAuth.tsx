import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
	const location = useLocation();
	const { role } = useAuth();

	if (role && allowedRoles.includes(role)) {
		return <Outlet />;
	} else {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
};
export default RequireAuth;
