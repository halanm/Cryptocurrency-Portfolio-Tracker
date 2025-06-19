import Dashboard from "../pages/private/home/Dashboard";

export const privateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    isPrivate: true,
  },
];
