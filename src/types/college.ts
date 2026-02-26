type Campus = '자연캠퍼스' | '인문캠퍼스';

type CollegeParams = {
  campus: Campus;
  name: string;
  description: string;
};

type DepartmentParams = {
  name: string;
  description: string;
  collegeId: number;
};

type College = {
  collegeId: number;
  campus: Campus;
  name: string;
};

type Department = {
  departmentId: number;
  name: string;
  collegeId: number;
};
