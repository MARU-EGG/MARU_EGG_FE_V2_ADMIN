import { schedulesHandler } from './schedules.mock';
import { API_PATH } from '@/stores/querys/api-path';
import { HttpResponse, delay, http } from 'msw';

export const delayForDevelopment = async (ms = 1000) => {
  if (process.env.NODE_ENV === 'development') {
    await delay(ms);
  }
};

export const handler = [...schedulesHandler];
