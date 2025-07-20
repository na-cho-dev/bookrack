import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import type { JSX } from "react";

export const ProtectedRouteWithOrg = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const { user, currentMembership, loadingUser } = useUserStore();

  if (loadingUser) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (!currentMembership) return <Navigate to="/select-org" replace />;

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

