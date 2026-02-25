import { AdmissionCategoryLabel, AdmissionLabel } from '@/types/admission';

export type Document = {
  id: number;
  title: string;
  page: number;
  created_at: string;
  content: string;
  category: AdmissionCategoryLabel;
};

export type DocumentResponse = {
  documents: Record<AdmissionLabel, Document[]>;
};

export type UploadDocumentParams = {
  type: AdmissionLabel;
  category: AdmissionCategoryLabel;
  pdf_file: File;
  page_gap: number;
};
