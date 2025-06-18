import App from "../App";
import { Login } from "../pages/public/login/Login";

export const publicRoutes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];
