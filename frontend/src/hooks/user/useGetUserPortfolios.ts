import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axiosInstance";
import { AuthService } from "../../services/authService";
import type { Portfolio } from "../../domain/Portfolio";

export const useGetUserPortfolios = () => {
  const token = AuthService.getAccessToken();

  return useQuery<Portfolio[] | null>({
    queryKey: ["portfolios"],
    queryFn: async () => {
      const res = await api.get("/users/me/portfolios");
      return res.status === 401 ? null : res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};
