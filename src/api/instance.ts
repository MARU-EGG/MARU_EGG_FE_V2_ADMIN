import { clearTokens, getAccessToken, getRefreshToken } from '@/utils/auth';
import axios from 'axios';

export const open_api_axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PUBLIC_API_ADDRESS,
  timeout: 20000,
});

export const llm_server_api_axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LLM_SERVER_API_ADDRESS,
});

export const spring_server_api_axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SPRING_SERVER_API_ADDRESS,
});

spring_server_api_axiosInstance.interceptors.request.use((config) => {
  // TODO: /campuses/ 경로는 CORS 테스트를 위해 인증 헤더 제외 (백엔드 CORS 설정 후 제거)
  const isPublicPath = config.url?.startsWith('/campuses/');
  if (!isPublicPath && typeof document !== 'undefined') {
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
