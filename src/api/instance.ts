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
