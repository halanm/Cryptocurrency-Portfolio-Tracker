import React from "react";
import { useLocation, Navigate } from "react-router";
import { useUser } from "../hooks/user/useUserContext";

export function ProtectedRoute({ children }: React.PropsWithChildren) {
  const { isAuthenticated, isLoading } = useUser();
  const { pathname } = useLocation();

  if (!isAuthenticated && !isLoading && pathname) {
    return <Navigate to={`/login`} />;
  }

  return children;
}
