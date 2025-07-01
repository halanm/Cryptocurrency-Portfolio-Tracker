import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axiosInstance";
import { AuthService } from "../../services/authService";

interface SignupData {
  email: string;
  password: string;
}

export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: SignupData) => {
      const res = await api.post("/auth/signup", data);

      if (res.status !== 201) {
        throw new Error(res.data.error || "Signup failed");
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
