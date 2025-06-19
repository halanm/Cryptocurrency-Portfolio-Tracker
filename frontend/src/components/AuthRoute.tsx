import React from "react";
import { useLocation, Navigate } from "react-router";
import { useUser } from "../hooks/user/useUserContext";

export function AuthRoute({ children }: React.PropsWithChildren) {
  const { isAuthenticated, isLoading } = useUser();
  const { pathname } = useLocation();

  if (isAuthenticated && !isLoading && pathname) {
    return <Navigate to={`/`} />;
  }

  return children;
}
