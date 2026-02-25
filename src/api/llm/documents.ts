import { llm_server_api_axiosInstance } from '@/api/instance';
import { AdmissionCategoryLabel, AdmissionLabel } from '@/types/admission';
import { DocumentResponse, UploadDocumentParams } from '@/types/document';

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

export async function uploadDocument({ type, category, pdf_file, page_gap }: UploadDocumentParams) {
  const formdata = new FormData();
  formdata.append('type', type);
  formdata.append('category', category);
  formdata.append('pdf_file', pdf_file);
  formdata.append('page_gap', page_gap.toString());

  const response = await llm_server_api_axiosInstance.post('/upload_pdf/', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

export async function deleteDocument({ type, category }: { type: AdmissionLabel; category?: AdmissionCategoryLabel }) {
  const params = { type, category };
  const response = await llm_server_api_axiosInstance.delete('/delete_documents', {
    params,
  });
  return response.data;
}
