import { useGetUserInfo } from "../hooks/user/useGetUserInfo";
import { UserContext } from "../contexts/UserContext";

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: user, isLoading, isError } = useGetUserInfo();

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
