import { open_api_axiosInstance } from '@/api/instance';
import { RestDayResponse } from '@/types/calendar';

export async function getRestDays(year: string): Promise<RestDayResponse> {
  const response = await open_api_axiosInstance.get(
    `/getRestDeInfo?serviceKey=${process.env.NEXT_PUBLIC_PUBLIC_API_KEY}&numOfRows=100&_type=json&solYear=${year}`,
  );
  return response.data;
}
