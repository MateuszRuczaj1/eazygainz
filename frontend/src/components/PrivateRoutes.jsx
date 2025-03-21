import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";
import { useEffect, useState } from "react";

export default function PrivateRoutes() {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsChecking(false);
    }
  }, [isLoading]);

  if (isChecking) {
    return <div>Ładowanie...</div>;
  }

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
