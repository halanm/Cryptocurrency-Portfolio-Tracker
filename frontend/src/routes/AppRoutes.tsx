import React from 'react';
import { type RouteObject, useRoutes } from 'react-router';
import { publicRoutes } from './public';

type Route = {
  path: string;
  element: JSX.Element;
};

export function AppRoutes() {
  const parseRouteObjects = (
    routes: Route[],
  ): RouteObject[] => {
    return routes.map((route) => ({
      path: route.path,
      element: route.element,
    }));
  };

  const publicRouteObjects = parseRouteObjects(publicRoutes);

  const routes = [
    ...publicRouteObjects,
  ];

  const allRoutes = useRoutes(routes);

  return <React.Fragment> {allRoutes} </React.Fragment>;
}