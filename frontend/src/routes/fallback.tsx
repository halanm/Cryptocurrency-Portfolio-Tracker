import { NotFound } from "../pages/fallback/not-found/NotFound";

export const fallbackRoutes = [
  {
    path: "*",
    element: <NotFound />,
  },
];
