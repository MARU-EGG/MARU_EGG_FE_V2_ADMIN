export const ADMISSIONS = { SUSI: '수시', JEONGSI: '정시', PYEONIP: '편입학' } as const;

export type AdmissionType = keyof typeof ADMISSIONS;
export type AdmissionLabel = (typeof ADMISSIONS)[AdmissionType];

export const ADMISSIONS_CATEGORIES = {
  ADMISSION_GUIDELINE: '모집요강',
  PASSING_RESULT: '입시결과',
  PAST_QUESTIONS: '기출문제',
  CAMPUS_LIFE: '대학생활',
  INTERVIEW_PRACTICAL_TEST: '면접/실기',
} as const;

export type AdmissionCategoryType = keyof typeof ADMISSIONS_CATEGORIES;
export type AdmissionCategoryLabel = (typeof ADMISSIONS_CATEGORIES)[AdmissionCategoryType];
