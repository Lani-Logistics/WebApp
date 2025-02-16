import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/Hooks";

const ProtectedRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes