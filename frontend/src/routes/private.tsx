import Dashboard from "../pages/private/Dashboard/Dashboard";
import Portfolios from "../pages/private/Portfolios/Portfolios";

export const privateRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    isPrivate: true,
  },
  {
    path: "/portfolios",
    element: <Portfolios />,
    isPrivate: true,
  },
];
