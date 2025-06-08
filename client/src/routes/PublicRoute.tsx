import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import type { JSX } from "react";

interface PublicRouteProps {
  children: JSX.Element;
}

const publicPaths = ["/login", "/register", "/forgot-password"];

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, loadingUser } = useUserStore();
  const location = useLocation();

  if (loadingUser) return null; // Prevent redirect during user loading

  if (user && publicPaths.includes(location.pathname)) {
    return <Navigate to="/select-org" replace />;
  }

  return children;
};

export default PublicRoute;
