import React from "react";
import { type RouteObject, useRoutes } from "react-router";

import { authRoutes } from "./auth";
import { privateRoutes } from "./private";
import { fallbackRoutes } from "./fallback";

import type { ReactElement } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AuthRoute } from "../components/AuthRoute";

type Route = {
  path: string;
  isPrivate?: boolean;
  isAuth?: boolean;
  element: ReactElement;
};

export function AppRoutes() {
  const parseRouteObjects = (routes: Route[]): RouteObject[] => {
    return routes.map((route) => ({
      path: route.path,
      element: route.isPrivate ? (
        <ProtectedRoute>{route.element}</ProtectedRoute>
      ) : route.isAuth ? (
        <AuthRoute>{route.element}</AuthRoute>
      ) : (
        route.element
      ),
    }));
  };

  const authRouteObjects = parseRouteObjects(authRoutes);
  const privateRouteObjects = parseRouteObjects(privateRoutes);
  const fallbackRouteObjects = parseRouteObjects(fallbackRoutes);

  const routes = [
    ...authRouteObjects,
    ...privateRouteObjects,
    ...fallbackRouteObjects,
  ];

  const allRoutes = useRoutes(routes);

  return <React.Fragment> {allRoutes} </React.Fragment>;
}
