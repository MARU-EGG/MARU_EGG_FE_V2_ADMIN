import { spring_server_api_axiosInstance } from '@/api/instance';
import { clearTokens, getAccessToken, getRefreshToken } from '@/utils/auth';

spring_server_api_axiosInstance.interceptors.request.use((config) => {
  if (typeof document !== 'undefined') {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (accessToken) {
      config.headers['authorization'] = accessToken;
    }
    if (refreshToken) {
      config.headers['authorization-refresh'] = refreshToken;
    }
  }
  return config;
});

spring_server_api_axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      clearTokens();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
