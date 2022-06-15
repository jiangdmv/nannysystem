import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {
  //   const { auth } = useAuth();
  const location = useLocation();

  const role = localStorage.getItem("role");
  console.log(role);

  return allowedRoles === role ? (
    <Outlet />
  ) : (
    <Navigate to="./" state={{ from: location }} replace />
  );
};

//   return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
//     <Outlet />
//   ) : (
//     <Navigate to="./" state={{ from: location }} replace />
//   );
// };

export default RequireAuth;
