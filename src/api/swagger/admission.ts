import { spring_server_api_axiosInstance } from '@/api/instance';
import { AdmissionType } from '@/types/admission';

export async function getAdmissionsStatus(): Promise<{ type: AdmissionType; isActivated: boolean }[]> {
  const response = await spring_server_api_axiosInstance.get('/admissions/status');
  return response.data;
}

export async function changeAdmissionStatus(admission: AdmissionType) {
  const response = await spring_server_api_axiosInstance.put('/admin/questions/status', { type: admission });
  return response.data;
}

export async function getAdmissionDetailsByType(
  type: AdmissionType,
): Promise<{ id: number; name: string; type: AdmissionType }[]> {
  const response = await spring_server_api_axiosInstance.get(`/admissions/details/${type}`);
  return response.data;
}

export async function createAdmissionsDetail(params: { type: AdmissionType; detail: string }) {
  const response = await spring_server_api_axiosInstance.post(`/admin/admissions/detail`, params);
  return response.data;
}

export async function deleteAdmissionDetail(id: string) {
  const response = await spring_server_api_axiosInstance.delete(`/admin/admissions/${id}`);
  return response.data;
}

export async function updateAdmissionDetail({ id, name }: { id: number; name: string }) {
  const response = await spring_server_api_axiosInstance.put(`/admin/admissions/${id}`, { name });
  return response.data;
}
