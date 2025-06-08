import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import type { JSX } from "react";

export const ProtectedRouteWithoutOrg = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const user = useUserStore((s) => s.user);
  const currentMembership = useUserStore((s) => s.currentMembership);

  if (!user) return <Navigate to="/login" replace />;
  if (currentMembership) {
    if (currentMembership.role === "admin") {
      return <Navigate to="/dashboard/admin" replace />;
    } else if (currentMembership.role === "user") {
      return <Navigate to="/dashboard/member" replace />;
    }
  } 

  return children;
};

export const ProtectedRouteWithOrg = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const user = useUserStore((s) => s.user);
  const currentMembership = useUserStore((s) => s.currentMembership);

  if (!user) return <Navigate to="/login" replace />;
  if (!currentMembership) return <Navigate to="/select-org" replace />;

  return children;
};
