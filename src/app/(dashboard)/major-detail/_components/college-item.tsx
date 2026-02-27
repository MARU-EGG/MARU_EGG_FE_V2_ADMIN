'use client';

import { useDeleteCollegeMutation } from '../hooks/use-college-mutations';
import CollegeFormDialog from './college-form-dialog';
import DeleteConfirmDialog from './delete-confirm-dialog';
import { cn } from '@/lib/utils';
import { College } from '@/types/college';
import { Pencil, Trash2 } from 'lucide-react';

type CollegeItemProps = {
  college: College;
  isSelected: boolean;
  onSelect: () => void;
};

function CollegeItem({ college, isSelected, onSelect }: CollegeItemProps) {
  const { mutate: deleteCollege } = useDeleteCollegeMutation();

  return (
    <div
      onClick={onSelect}
      className={cn(
        'flex cursor-pointer items-center justify-between px-4 py-3 transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50',
        isSelected && 'bg-primary-egg hover:bg-primary-egg/50',
      )}
    >
      <span className="text-sm font-medium text-gray-800">{college.name}</span>
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <CollegeFormDialog mode="edit" college={college}>
          <button
            type="button"
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <Pencil size={13} />
          </button>
        </CollegeFormDialog>
        <DeleteConfirmDialog
          name={`"${college.name}" 대학을 삭제하시겠어요?`}
          description="삭제된 대학은 복구할 수 없으며, 소속 학과도 함께 삭제될 수 있어요."
          onConfirm={() => deleteCollege(college.collegeId)}
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

export default CollegeItem;
