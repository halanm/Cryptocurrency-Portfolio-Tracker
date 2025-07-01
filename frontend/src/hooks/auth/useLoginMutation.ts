import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axiosInstance";
import { AuthService } from "../../services/authService";

interface LoginData {
  email: string;
  password: string;
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginData) => {
      const res = await api.post("/auth/login", data);

      if (res.status !== 200) {
        throw new Error(res.data.error || "Login failed");
      }

      const { token, refresh_token } = res.data;
      AuthService.setTokens(token, refresh_token);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
