import React from "react";
import { type RouteObject, useRoutes } from "react-router";

import { publicRoutes } from "./public";
import { fallbackRoutes } from "./fallback";

import type { ReactElement } from "react";

type Route = {
  path: string;
  element: ReactElement;
};

export function AppRoutes() {
  const parseRouteObjects = (routes: Route[]): RouteObject[] => {
    return routes.map((route) => ({
      path: route.path,
      element: route.element,
    }));
  };

  const publicRouteObjects = parseRouteObjects(publicRoutes);
  const fallbackRouteObjects = parseRouteObjects(fallbackRoutes);

  const routes = [...publicRouteObjects, ...fallbackRouteObjects];

  const allRoutes = useRoutes(routes);

  return <React.Fragment> {allRoutes} </React.Fragment>;
}
