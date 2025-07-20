import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import type { JSX } from "react";

interface PublicRouteProps {
  children: JSX.Element;
}

const publicPaths = ["/login", "/register", "/forgot-password"];

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, currentMembership, loadingUser } = useUserStore();
  const location = useLocation();

  if (loadingUser) return null;

  if (user && publicPaths.some((path) => location.pathname.startsWith(path))) {
    if (!currentMembership) {
      return <Navigate to="/select-org" replace />;
    }

    if (currentMembership.role === "admin") {
      return <Navigate to="/dashboard/admin" replace />;
    } else if (currentMembership.role === "user") {
      return <Navigate to="/dashboard/member" replace />;
    }
  }

  return children;
};


export default PublicRoute;
