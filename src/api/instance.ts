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
  if (typeof document !== 'undefined') {
    const accessToken = getAccessToken();
    // const refreshToken = getRefreshToken();
    if (accessToken) {
      config.headers['authorization'] = accessToken;
    }
    // TODO: 현재 refreshToken이 cors에러에 걸림, 백엔드에서 허용 필요 or refreshtoken을 통한 accesstoken 재발급 api 추가 필요
    // if (refreshToken) {
    //   config.headers['authorization-refresh'] = refreshToken;
    // }
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
