import { useQuery } from "@tanstack/react-query";
import { api } from "../../lib/axiosInstance";
import { AuthService } from "../../services/authService";
import type { Portfolio } from "../../domain/Portfolio";

type UseUserPortfoliosParams = {
  portfolio_id?: string | number;
};

export const useGetPortfolioDetails = ({
  portfolio_id,
}: UseUserPortfoliosParams) => {
  const token = AuthService.getAccessToken();

  return useQuery<Portfolio | null>({
    queryKey: ["portfolio-details", portfolio_id],
    queryFn: async () => {
      const res = await api.get(`/portfolios/${portfolio_id}/details`);
      return res.status === 401 ? null : res.data;
    },
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
  });
};
