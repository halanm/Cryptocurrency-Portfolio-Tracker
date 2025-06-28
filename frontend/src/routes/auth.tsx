import { Login } from "../pages/auth/login/Login";
import { Register } from "../pages/auth/register/Register";

export const authRoutes = [
  {
    path: "/login",
    element: <Login />,
    isAuth: true,
  },
  {
    path: "/signup",
    element: <Register />,
    isAuth: true,
  },
];
