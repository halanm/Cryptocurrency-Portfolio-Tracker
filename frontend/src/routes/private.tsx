import Dashboard from "../pages/private/Dashboard/Dashboard";
import PortfolioDetails from "../pages/private/PortfolioDetails/PortfolioDetails";
import Portfolios from "../pages/private/Portfolios/Portfolios";
import Trade from "../pages/private/Trade/Trade";

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
  {
    path: "/portfolios/:portfolioId",
    element: <PortfolioDetails />,
    isPrivate: true,
  },
  {
    path: "/trade",
    element: <Trade />,
    isPrivate: true,
  },
];
