import { llm_server_api_axiosInstance } from '@/api/instance';
import { AdmissionCategoryLabel, AdmissionLabel } from '@/types/admission';
import { DocumentResponse } from '@/types/document';

export async function getDocuments({
  type,
  category,
}: {
  type: AdmissionLabel;
  category?: AdmissionCategoryLabel;
}): Promise<DocumentResponse> {
  const params = { type, category };
  const response = await llm_server_api_axiosInstance.get('/retrieve_documents', { params });
  return response.data;
}
