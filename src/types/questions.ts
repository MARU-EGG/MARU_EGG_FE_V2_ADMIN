import type { AdmissionType } from '@/types/admission';

export type QuestionAnswer = {
  id: number;
  content: string;
  renewalYear: number;
  dateInformation: string;
};

export type QuestionItem = {
  id: number;
  content: string;
  viewCount: number;
  isChecked: boolean;
  dateInformation: string;
  answer: QuestionAnswer;
};

export type GetQuestionsParams = {
  type: AdmissionType;
};
