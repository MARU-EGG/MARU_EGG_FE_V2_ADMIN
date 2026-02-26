import { spring_server_api_axiosInstance } from '@/api/instance';

export async function getColleges(): Promise<College[]> {
  const response = await spring_server_api_axiosInstance.get('/campuses/colleges');
  return response.data;
}

export async function getCollegesByCampusType(campusType: Campus): Promise<College[]> {
  const response = await spring_server_api_axiosInstance.get(`/campuses/colleges/campus/${campusType}`);
  return response.data;
}

export async function getDepartments(): Promise<Department[]> {
  const response = await spring_server_api_axiosInstance.get('/campuses/departments');
  return response.data;
}

export async function getDepartmentsByCollege(collegeId: number): Promise<Department[]> {
  const response = await spring_server_api_axiosInstance.get(`/campuses/departments/college/${collegeId}`);
  return response.data;
}

export async function createCollege(params: CollegeParams) {
  const response = await spring_server_api_axiosInstance.post('/admin/campuses/colleges', params);
  return response.data;
}

export async function updateCollege({ collegeId, params }: { collegeId: string; params: CollegeParams }) {
  const response = await spring_server_api_axiosInstance.put(`/admin/campuses/colleges/${collegeId}`, params);
  return response.data;
}

export async function deleteCollege(collegeId: number) {
  const response = await spring_server_api_axiosInstance.delete(`/admin/campuses/colleges/${collegeId}`);
  return response.data;
}

export async function createDepartment(params: DepartmentParams) {
  const response = await spring_server_api_axiosInstance.post('/admin/campuses/departments', params);
  return response.data;
}

export async function updateDepartment({
  departmentId,
  params,
}: {
  departmentId: string;
  params: Omit<DepartmentParams, 'collegeId'>;
}) {
  const response = await spring_server_api_axiosInstance.put(`/admin/campuses/departments/${departmentId}`, params);
  return response.data;
}

export async function deleteDepartment(departmentId: number) {
  const response = await spring_server_api_axiosInstance.delete(`/admin/campuses/departments/${departmentId}`);
  return response.data;
}
