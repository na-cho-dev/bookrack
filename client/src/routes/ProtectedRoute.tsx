import { Navigate, useLocation } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import type { JSX } from "react";

export const ProtectedRouteWithOrg = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { user, currentMembership, loadingUser } = useUserStore();
  const location = useLocation();

  if (loadingUser) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!currentMembership) return <Navigate to="/select-org" replace />;
  const path = location.pathname;

  if (path.startsWith("/dashboard/admin") && currentMembership.role !== "admin")
    return <Navigate to="/dashboard/member" replace />;

  if (
    path.startsWith("/dashboard/member") &&
    currentMembership.role !== "user" &&
    currentMembership.role !== "member"
  )
    return <Navigate to="/dashboard/admin" replace />;

  return children;
};

export const ProtectedRouteWithoutOrg = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { user, currentMembership, loadingUser } = useUserStore();

  if (loadingUser) return null;
  if (!user) return <Navigate to="/login" replace />;

  if (currentMembership?.role === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  } else if (currentMembership?.role === "user") {
    return <Navigate to="/dashboard/member" replace />;
  }

  return children;
};
