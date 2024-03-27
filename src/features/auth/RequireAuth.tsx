import { useSelector } from "react-redux";
import { selectCurrentRoles, selectCurrentToken } from "./authSlice";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = ({ allowedRoles }) => {
  const accessToken = useSelector(selectCurrentToken);
  const roles = useSelector(selectCurrentRoles);
  const location = useLocation();
  console.log("roles", roles);
  console.log("allowed", allowedRoles);
  console.log(roles?.find((role) => allowedRoles.includes(role)));
  return roles?.find((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : accessToken ? (
    <Navigate to={"/unauthorized"} state={{ from: location }} replace />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
