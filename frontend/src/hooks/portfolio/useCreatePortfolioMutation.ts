import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axiosInstance";
import { AuthService } from "../../services/authService";

interface NewPortfolioData {
  name: string | null;
}

export const useCreatePortfolioMutation = () => {
  const queryClient = useQueryClient();
  const token = AuthService.getAccessToken();

  return useMutation({
    mutationFn: async (data: NewPortfolioData) => {
      const res = await api.post(`/users/me/portfolios`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
};
