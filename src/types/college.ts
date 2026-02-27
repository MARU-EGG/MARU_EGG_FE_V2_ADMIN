export type Campus = '자연캠퍼스' | '인문캠퍼스';

export type CollegeParams = {
  campus: Campus;
  name: string;
  description: string;
};

export type DepartmentParams = {
  name: string;
  description: string;
  collegeId: number;
};

export type College = {
  collegeId: number;
  campus: Campus;
  name: string;
};

export type Department = {
  departmentId: number;
  name: string;
  collegeId: number;
};
