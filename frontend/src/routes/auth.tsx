import { Login } from "../pages/auth/login/Login";

export const authRoutes = [
  {
    path: "/login",
    element: <Login />,
    isAuth: true,
  },
];
