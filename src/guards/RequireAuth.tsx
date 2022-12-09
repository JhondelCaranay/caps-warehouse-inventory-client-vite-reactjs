import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { role } = useAuth();

	if (role && allowedRoles.includes(role)) {
		return <Outlet />;
	} else if (role) {
		// navigate back to previous page
		//  add delay to allow the page to load
		useEffect(() => {
			navigate(-1);
		}, []);

		return null;
	} else {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}
};
export default RequireAuth;
