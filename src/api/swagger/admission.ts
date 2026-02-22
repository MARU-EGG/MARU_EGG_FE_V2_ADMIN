import { spring_server_api_axiosInstance } from '@/api/instance';
import { AdmissionType } from '@/types/admission';

export async function getAdmissionsStatus(): Promise<{ type: AdmissionType; isActivated: boolean }[]> {
  const response = await spring_server_api_axiosInstance.get('/admissions/status');
  return response.data;
}

export async function changeAdmissionStatus(admission: 'SUSI' | 'JEONGSI' | 'PYEONIP') {
  const response = await spring_server_api_axiosInstance.put('/admin/questions/status', { type: admission });
  return response.data;
}
