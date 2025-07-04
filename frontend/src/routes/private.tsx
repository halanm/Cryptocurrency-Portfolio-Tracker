import Dashboard from "../pages/private/Dashboard/Dashboard";
import NewPortfolio from "../pages/private/NewPortfolio/NewPortfolio";
import PortfolioDetails from "../pages/private/PortfolioDetails/PortfolioDetails";
import Portfolios from "../pages/private/Portfolios/Portfolios";
import Profile from "../pages/private/Profile/Profile";
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
  {
    path: "/profile",
    element: <Profile />,
    isPrivate: true,
  },
  {
    path: "/new-portfolio",
    element: <NewPortfolio />,
    isPrivate: true,
  },
];
