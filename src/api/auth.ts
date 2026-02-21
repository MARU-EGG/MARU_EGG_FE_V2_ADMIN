import { spring_server_api_axiosInstance } from '@/api/instance';

export async function signIn({ email, password }: { email: string; password: string }) {
  const response = await spring_server_api_axiosInstance.post('/auth/sign-in', {
    email,
    password,
  });
  return {
    accessToken: response.headers['authorization'] as string,
    refreshToken: response.headers['authorization-refresh'] as string,
  };
}

export async function signUp({ email, password }: { email: string; password: string }) {
  const response = await spring_server_api_axiosInstance.post('/auth/sign-up', {
    email,
    password,
  });
  return response.data;
}

export async function getCurrentUser() {
  const response = await spring_server_api_axiosInstance.get('/auth/me');
  return response.data;
}
