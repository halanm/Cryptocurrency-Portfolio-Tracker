import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axiosInstance";
import type { User } from "../../domain/User";
import { AuthService } from "../../services/authService";

export const useUserQuery = () => {
  const token = AuthService.getAccessToken();

  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await api.get("/users/me");
      return res.status === 401 ? null : res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};
