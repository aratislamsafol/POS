import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const GuestRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default GuestRoute;
