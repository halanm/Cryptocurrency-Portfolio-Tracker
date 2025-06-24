import Dashboard from "../pages/private/Dashboard/Dashboard";

export const privateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    isPrivate: true,
  },
];
