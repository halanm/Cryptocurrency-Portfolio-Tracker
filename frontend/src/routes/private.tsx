import Dashboard from "../pages/private/Dashboard/Dashboard";
import PortfolioDetails from "../pages/private/PortfolioDetails/PortfolioDetails";
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
  {
    path: "/portfolios/:portfolioId",
    element: <PortfolioDetails />,
    isPrivate: true,
  },
];
