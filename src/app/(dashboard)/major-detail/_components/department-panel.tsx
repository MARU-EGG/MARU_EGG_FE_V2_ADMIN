'use client';

import DepartmentFormDialog from './department-form-dialog';
import DepartmentItem from './department-item';
import { useDepartmentsQuery } from '../hooks/use-departments-query';
import Button from '@/components/button/button';
import { BookOpen, Plus } from 'lucide-react';

type DepartmentPanelProps = {
  selectedCollege: College | null;
};

function DepartmentPanel({ selectedCollege }: DepartmentPanelProps) {
  const { data: departments = [] } = useDepartmentsQuery(selectedCollege?.collegeId ?? null);

  if (!selectedCollege) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-200 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <BookOpen size={22} className="text-gray-400" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-gray-500">대학을 선택해주세요</p>
          <p className="text-xs text-gray-400">좌측 목록에서 대학을 클릭하면 학과 목록이 표시돼요</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">{selectedCollege.name}</span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">
            학과 목록
          </span>
        </div>
        <span className="text-xs text-gray-400">{departments.length}개</span>
      </div>
      <div className="flex flex-col divide-y rounded-xl border border-gray-200 overflow-hidden">
        {departments.map((dept) => (
          <DepartmentItem key={dept.departmentId} department={dept} />
        ))}
        {departments.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-400">등록된 학과가 없어요</p>
        )}
      </div>
      <DepartmentFormDialog mode="create" collegeId={selectedCollege.collegeId}>
        <Button variant="secondary" size="large" className="flex w-full items-center justify-center gap-1">
          <Plus size={14} />
          학과 추가
        </Button>
      </DepartmentFormDialog>
    </div>
  );
}

export default DepartmentPanel;
