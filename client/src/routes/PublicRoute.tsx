import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import type { JSX } from "react";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const user = useUserStore((state) => state.user);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;
