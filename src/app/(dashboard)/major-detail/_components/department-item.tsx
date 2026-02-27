'use client';

import { useDeleteDepartmentMutation } from '../hooks/use-department-mutations';
import DeleteConfirmDialog from '@/components/delete-confirm-dialog/delete-confirm-dialog';
import DepartmentFormDialog from './department-form-dialog';
import { Department } from '@/types/college';
import { Pencil, Trash2 } from 'lucide-react';

type DepartmentItemProps = {
  department: Department;
};

function DepartmentItem({ department }: DepartmentItemProps) {
  const { mutate: deleteDepartment } = useDeleteDepartmentMutation();

  return (
    <div className="flex items-center justify-between px-4 py-3 transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50">
      <span className="text-sm font-medium text-gray-800">{department.name}</span>
      <div className="flex items-center gap-1">
        <DepartmentFormDialog mode="edit" department={department}>
          <button
            type="button"
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <Pencil size={13} />
          </button>
        </DepartmentFormDialog>
        <DeleteConfirmDialog
          name={`"${department.name}" 학과를 삭제하시겠어요?`}
          description="삭제된 학과는 복구할 수 없어요."
          onConfirm={() => deleteDepartment({ departmentId: department.departmentId, collegeId: department.collegeId })}
        >
          <button
            type="button"
            className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 size={13} />
          </button>
        </DeleteConfirmDialog>
      </div>
    </div>
  );
}

export default DepartmentItem;
