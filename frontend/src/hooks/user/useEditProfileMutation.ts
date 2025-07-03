import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../../lib/axiosInstance";

interface EditProfileData {
  preferred_currency: string;
}

export const useEditProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: EditProfileData) => {
      const res = await api.patch("/users/me", data);

      if (res.status !== 200) {
        throw new Error(res.data.error || "Edit profile failed");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
