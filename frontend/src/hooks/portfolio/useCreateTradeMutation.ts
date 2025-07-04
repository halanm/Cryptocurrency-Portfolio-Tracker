import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axiosInstance";
import { AuthService } from "../../services/authService";

interface TradeData {
  token_symbol: string | null;
  amount_invested: number | null;
  trade_type: string | null;
}

type useCreateTradeMutation = {
  portfolio_id?: string | number | null;
  data: TradeData;
};

export const useCreateTradeMutation = () => {
  const queryClient = useQueryClient();
  const token = AuthService.getAccessToken();

  return useMutation({
    mutationFn: async ({ portfolio_id, data }: useCreateTradeMutation) => {
      const res = await api.post(`/portfolios/${portfolio_id}/trades/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-details"] });
    },
  });
};
