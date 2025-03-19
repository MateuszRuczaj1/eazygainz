import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";

export default function PrivateRoutes() {
  const { userToken } = useAuth();
  const location = useLocation();
  console.log(userToken);
  console.log("From protected route");
  return userToken ? (
    <Outlet />
  ) : (
    <Navigate to={"/register"} replace state={{ from: location }} />
  );
}
