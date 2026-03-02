'use client';

import {
  useCreateAdmissionDetailMutation,
  useUpdateAdmissionDetailMutation,
} from '../hooks/use-admission-detail-mutations';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { AdmissionType } from '@/types/admission';
import { TriangleAlert } from 'lucide-react';
import { useState } from 'react';

type CreateProps = {
  mode: 'create';
  type: AdmissionType;
  detail?: never;
  children: React.ReactNode;
};

type EditProps = {
  mode: 'edit';
  type: AdmissionType;
  detail: { id: number; name: string };
  children: React.ReactNode;
};

type AdmissionDetailFormDialogProps = CreateProps | EditProps;

function AdmissionDetailFormDialog({ mode, type, detail, children }: AdmissionDetailFormDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(mode === 'edit' ? detail.name : '');

  const { mutate: create, isPending: isCreating } = useCreateAdmissionDetailMutation();
  const { mutate: update, isPending: isUpdating } = useUpdateAdmissionDetailMutation(type);
  const isPending = isCreating || isUpdating;

  const isFormatValid = /\(.+\)/.test(name);
  const showFormatError = name.trim().length > 0 && !isFormatValid;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setName(mode === 'edit' ? detail.name : '');
    }
    setOpen(nextOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      create({ type, detail: name }, { onSuccess: () => setOpen(false) });
    } else {
      update({ id: detail.id, name }, { onSuccess: () => setOpen(false) });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? '상세 타입 추가' : '상세 타입 수정'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              상세 타입 이름 <span className="text-red-500">*</span>
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="예) 학생부종합(계열 모집)"
              required
            />
            {showFormatError ? (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <TriangleAlert size={12} />
                형식이 올바르지 않아요. <span className="font-medium">대전형(소전형)</span> 형식을 사용해주세요.
              </p>
            ) : (
              <p className="text-xs text-gray-400">
                입력 형식: <span className="font-medium text-gray-500">대전형(소전형)</span>
                &nbsp;·&nbsp; 예) 학생부종합(계열 모집)
              </p>
            )}
          </div>
          <DialogFooter className="mt-2">
            <Button
              type="submit"
              disabled={!name.trim() || !isFormatValid || isPending}
              className="w-full bg-primary-maru hover:bg-opacity-70"
            >
              {isPending ? '처리 중...' : mode === 'create' ? '추가하기' : '수정하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdmissionDetailFormDialog;
