import { useUserQuery } from "../hooks/user/useUserQuery";
import { UserContext } from "../contexts/UserContext";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: user, isLoading, isError } = useUserQuery();

  return (
    <UserContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        isError,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
