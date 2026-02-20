const LLM_SERVER_API_PATH = process.env.NEXT_PUBLIC_LLM_SERVER_API_ADDRESS;
const SPRING_SERVER_API_PATH = process.env.NEXT_PUBLIC_SPRING_SERVER_API_ADDRESS;

export const API_PATH = {
  admission: `${SPRING_SERVER_API_PATH}/admin/admissions`,
  admissionStatus: `${SPRING_SERVER_API_PATH}/admin/questions/status`,
  answer: `${SPRING_SERVER_API_PATH}/admin/answers`,
  college: `${SPRING_SERVER_API_PATH}/admin/colleges`,
  department: `${SPRING_SERVER_API_PATH}/admin/departments`,
  adminQuestion: `${SPRING_SERVER_API_PATH}/admin/questions`,
  auth: `${SPRING_SERVER_API_PATH}/auth`,
  question: `${SPRING_SERVER_API_PATH}/questions`,
  schedules: `${SPRING_SERVER_API_PATH}/admin/schedules`,
  llmServer: `${LLM_SERVER_API_PATH}`,
};
