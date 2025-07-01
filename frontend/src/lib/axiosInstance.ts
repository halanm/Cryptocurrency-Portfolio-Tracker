import axios from "axios";
import { AuthService } from "../services/authService";

export interface ApiError {
  response?: {
    data?: {
      error?: string;
      errors?: string[];
    };
  };
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

api.interceptors.request.use(
  (config) => {
    const token = AuthService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!AuthService.getRefreshToken()) {
        AuthService.clearTokens();
        return Promise.reject(error);
      }

      try {
        const newAccessToken = await AuthService.refreshToken();

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        AuthService.clearTokens();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
