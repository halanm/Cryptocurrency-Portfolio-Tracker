import { api } from "../lib/axiosInstance";

import Cookies from "js-cookie";

let accessToken = Cookies.get("access_token") ?? "";
let refreshToken = Cookies.get("refresh_token") ?? "";

export const AuthService = {
  getAccessToken: () => accessToken,
  getRefreshToken: () => refreshToken,

  setTokens: (access: string, refresh: string) => {
    accessToken = access;
    refreshToken = refresh;
    Cookies.set("access_token", access);
    Cookies.set("refresh_token", refresh);
  },

  clearTokens: () => {
    accessToken = "";
    refreshToken = "";
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
  },

  refreshToken: async (): Promise<string> => {
    const res = await api.post("auth/refresh", null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const { accessToken: newAccess, refreshToken: newRefresh } = res.data;
    AuthService.setTokens(newAccess, newRefresh);
    return newAccess;
  },
};
