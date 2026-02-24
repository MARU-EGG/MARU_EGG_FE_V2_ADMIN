'use client';

import { ADMISSIONS, ADMISSIONS_CATEGORIES, AdmissionCategoryType, AdmissionType } from '@/types/admission';
import { useDocumentUploadMutation } from '@/app/(dashboard)/admission-active/hooks/use-document-upload-mutation';
import Button from '@/components/button/button';
import Selector from '@/components/selector';
import { toast } from '@/components/toast';
import { Button as ShadcnButton } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Uploader from '@/components/uploader';
import { useState } from 'react';

function AdmissionDocumentUpload() {
  const { mutateAsync, isPending } = useDocumentUploadMutation();
  const [open, setOpen] = useState(false);
  const [selectedAdmissionType, setSelectedAdmissionType] = useState<AdmissionType>();
  const [selectedCategory, setSelectedCategory] = useState<AdmissionCategoryType>();
  const [files, setFiles] = useState<File[]>([]);

  const resetForm = () => {
    setSelectedAdmissionType(undefined);
    setSelectedCategory(undefined);
    setFiles([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedAdmissionType || !selectedCategory || files.length === 0) {
      toast.open({ type: 'error', position: 'top-center', message: '전형, 카테고리, 파일을 모두 선택해주세요' });
      return;
    }

    await mutateAsync(
      {
        type: ADMISSIONS[selectedAdmissionType],
        category: ADMISSIONS_CATEGORIES[selectedCategory],
        files,
      },
      {
        onSuccess: () => {
          toast.open({ type: 'success', position: 'top-center', message: '파일이 업로드되었어요' });
          resetForm();
          setOpen(false);
        },
        onError: () => {
          toast.open({ type: 'error', position: 'top-center', message: '파일 업로드에 실패했어요' });
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="large">
          파일 업로드
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl">파일 업로드</DialogTitle>
          <DialogDescription>선택한 전형에 필요한 파일을 업로드하세요</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mb-8 grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">전형 선택</span>
              <Selector selectorSize="large">
                <Selector.Trigger placeholder="전형을 선택해주세요" />
                <Selector.Menus>
                  {Object.entries(ADMISSIONS).map(([value, label]) => (
                    <Selector.Menu
                      key={value}
                      value={value}
                      label={label}
                      onClick={(value) => setSelectedAdmissionType(value as AdmissionType)}
                    />
                  ))}
                </Selector.Menus>
              </Selector>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">카테고리 선택</span>
              <Selector selectorSize="large">
                <Selector.Trigger placeholder="카테고리를 선택해주세요" />
                <Selector.Menus>
                  {Object.entries(ADMISSIONS_CATEGORIES).map(([value, label]) => (
                    <Selector.Menu
                      key={value}
                      value={value}
                      label={label}
                      onClick={(value) => setSelectedCategory(value as AdmissionCategoryType)}
                    />
                  ))}
                </Selector.Menus>
              </Selector>
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">파일 업로드</span>
            <div className="rounded-lg border border-dashed border-gray-300 p-4">
              <Uploader onFilesChange={setFiles}>
                <Uploader.Button />
                <Uploader.Lists />
              </Uploader>
            </div>
          </div>
          <DialogFooter>
            <ShadcnButton
              type="submit"
              disabled={isPending}
              className="w-full bg-primary-maru hover:bg-blue-600"
            >
              {isPending ? '업로드 중...' : '업로드하기'}
            </ShadcnButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AdmissionDocumentUpload;
