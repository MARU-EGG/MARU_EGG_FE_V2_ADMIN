import { spring_server_api_axiosInstance } from './instance';
import type { GetQuestionsParams, QuestionItem } from '@/types/questions';

export async function editQuestion({ id, content }: { id: number; content: string }) {
  const response = await spring_server_api_axiosInstance.put('/admin/questions', { id, content });
  return response.data;
}

export async function editAnswer({ id, content }: { id: number; content: string }) {
  const response = await spring_server_api_axiosInstance.put('/admin/answers', { id, content });
  return response.data;
}

export async function deleteQuestion({ id }: { id: number }) {
  const endpoint = `/admin/questions/${id}`;
  const response = await spring_server_api_axiosInstance.delete(endpoint);
  return response.data;
}

export async function verifyQA({ questionId }: { questionId: number }) {
  const response = await spring_server_api_axiosInstance.put('/admin/questions/check', { questionId });
  return response.data;
}

export async function getQuestions(params: GetQuestionsParams): Promise<QuestionItem[]> {
  const response = await spring_server_api_axiosInstance.get('/questions', { params });
  return response.data;
}
