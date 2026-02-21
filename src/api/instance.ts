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
    const getCookie = (name: string) => {
      const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
      return match ? decodeURIComponent(match[1]) : null;
    };
    const accessToken = getCookie('accessToken');
    const refreshToken = getCookie('refreshToken');
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
    if (refreshToken) {
      config.headers['Authorization-refresh'] = refreshToken;
    }
  }
  return config;
});

spring_server_api_axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
