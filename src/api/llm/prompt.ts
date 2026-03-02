import { llm_server_api_axiosInstance } from '@/api/instance';
import { AdmissionCategoryLabel, AdmissionLabel } from '@/types/admission';

export async function getPrompt({
  type,
  category,
}: {
  type: AdmissionLabel;
  category: AdmissionCategoryLabel;
}): Promise<{ prompt_text: string }> {
  const response = await llm_server_api_axiosInstance.get('/get-prompt/', { params: { type, category } });
  return response.data;
}

export async function updatePrompt({
  question_type,
  question_category,
  prompt_text,
}: {
  question_type: AdmissionLabel;
  question_category: AdmissionCategoryLabel;
  prompt_text: string;
}) {
  const response = await llm_server_api_axiosInstance.put('/update-prompt', {
    question_type,
    question_category,
    prompt_text,
  });
  return response.data;
}

export async function deletePrompt({
  type,
  category,
}: {
  type: AdmissionLabel;
  category: AdmissionCategoryLabel;
}) {
  const response = await llm_server_api_axiosInstance.delete('/delete-prompt/', { params: { type, category } });
  return response.data;
}
