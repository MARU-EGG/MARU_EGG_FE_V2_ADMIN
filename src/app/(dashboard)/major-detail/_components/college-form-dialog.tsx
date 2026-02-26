'use client';

import { useCreateCollegeMutation, useUpdateCollegeMutation } from '../hooks/use-college-mutations';
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
  selectedCampus: Campus;
  college?: never;
  children: React.ReactNode;
};

type EditProps = {
  mode: 'edit';
  college: College;
  selectedCampus?: never;
  children: React.ReactNode;
};

type CollegeFormDialogProps = CreateProps | EditProps;

function CollegeFormDialog({ mode, college, selectedCampus, children }: CollegeFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(mode === 'edit' ? college.name : '');
  const [description, setDescription] = useState('');

  const campus = mode === 'edit' ? college.campus : selectedCampus;

  const { mutate: create, isPending: isCreating } = useCreateCollegeMutation();
  const { mutate: update, isPending: isUpdating } = useUpdateCollegeMutation();
  const isPending = isCreating || isUpdating;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setName(mode === 'edit' ? college.name : '');
      setDescription('');
    }
    setOpen(nextOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = { campus, name, description };
    if (mode === 'create') {
      create(params, { onSuccess: () => setOpen(false) });
    } else {
      update(
        { collegeId: String(college.collegeId), params },
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
          <DialogTitle>{mode === 'create' ? '대학 추가' : '대학 수정'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">캠퍼스</label>
            <p className="rounded-md border border-input bg-gray-50 px-3 py-2 text-sm text-gray-600">
              {campus}
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              대학명 <span className="text-red-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예) 공과대학"
              required
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">설명</label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="대학에 대한 간략한 설명을 입력하세요"
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

export default CollegeFormDialog;
