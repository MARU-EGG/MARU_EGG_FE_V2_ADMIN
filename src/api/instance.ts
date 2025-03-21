import axios from 'axios';

export const open_api_axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PUBLIC_API_ADDRESS,
  timeout: 20000,
});
