'use client';

import { useCreateDepartmentMutation, useUpdateDepartmentMutation } from '../hooks/use-department-mutations';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

type CreateProps = {
  mode: 'create';
  collegeId: number;
  department?: never;
  children: React.ReactNode;
};

type EditProps = {
  mode: 'edit';
  department: Department;
  collegeId?: never;
  children: React.ReactNode;
};

type DepartmentFormDialogProps = CreateProps | EditProps;

function DepartmentFormDialog({ mode, department, collegeId, children }: DepartmentFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(mode === 'edit' ? department.name : '');
  const [description, setDescription] = useState('');

  const resolvedCollegeId = mode === 'edit' ? department.collegeId : collegeId;

  const { mutate: create, isPending: isCreating } = useCreateDepartmentMutation();
  const { mutate: update, isPending: isUpdating } = useUpdateDepartmentMutation();
  const isPending = isCreating || isUpdating;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setName(mode === 'edit' ? department.name : '');
      setDescription('');
    }
    setOpen(nextOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      create(
        { name, description, collegeId: resolvedCollegeId },
        { onSuccess: () => setOpen(false) },
      );
    } else {
      update(
        {
          departmentId: String(department.departmentId),
          params: { name, description },
          collegeId: resolvedCollegeId,
        },
        { onSuccess: () => setOpen(false) },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? '학과 추가' : '학과 수정'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              학과명 <span className="text-red-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예) 컴퓨터공학과"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">설명</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="학과에 대한 간략한 설명을 입력하세요"
            />
          </div>
          <DialogFooter className="mt-2">
            <Button type="submit" disabled={!name.trim() || isPending} className="w-full">
              {isPending ? '처리 중...' : mode === 'create' ? '추가하기' : '수정하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default DepartmentFormDialog;
