import { createContext } from "react";
import type { User } from "../domain/User";

type UserContext = {
  user: User | null;
  isLoading: boolean;
  isError: boolean;
  isAuthenticated: boolean;
};

export const UserContext = createContext<UserContext>({} as UserContext);
