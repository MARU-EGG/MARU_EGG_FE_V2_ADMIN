import useAdmissionUploadDocuemnt from '@/app/(dashboard)/admission-active/hooks/use-admission-upload-document';
import FileUploading from '@/components/lottie/file-uploading';
import Selector from '@/components/selector';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Uploader from '@/components/uploader';
import { ADMISSIONS, ADMISSIONS_CATEGORIES, AdmissionCategoryType, AdmissionType } from '@/types/admission';
import { useQueryClient } from '@tanstack/react-query';
import { Info, Loader2 } from 'lucide-react';
import { useState } from 'react';

function AdmissionDocuemntUploadForm({ handleDialogOpen }: { handleDialogOpen: (param: boolean) => void }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useAdmissionUploadDocuemnt();

  const [selectedAdmissionType, setSelectedAdmissionType] = useState<AdmissionType>();
  const [selectedCategory, setSelectedCategory] = useState<AdmissionCategoryType>();
  const [file, setFile] = useState<File>();
  const [pageGap, setPageGap] = useState<number>(0);

  const isDisabled = !selectedAdmissionType || !selectedCategory || !file;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isDisabled) return;
    mutate(
      {
        type: ADMISSIONS[selectedAdmissionType],
        category: ADMISSIONS_CATEGORIES[selectedCategory],
        pdf_file: file,
        page_gap: pageGap,
      },
      {
        onSuccess: () => {
          handleDialogOpen(false);
          queryClient.refetchQueries({ queryKey: ['documents', ADMISSIONS[selectedAdmissionType]] });
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <FileUploading isLoading={isPending}>
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
            <Uploader mode="single" onFileChange={(files) => setFile(files[0])}>
              <Uploader.Button />
              <Uploader.Lists />
            </Uploader>
          </div>
        </div>
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-gray-700">페이지 보정값</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger type="button">
                  <Info className="h-4 w-4 text-gray-600" />
                </TooltipTrigger>
                <TooltipContent className="max-w-60">
                  <p>목차의 페이지 번호와 PDF 실제 페이지가 다를 때 입력하세요.</p>
                  <p className="mt-1 text-gray-300">예) PDF 1페이지 = 목차 5페이지라면 4 입력</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            type="number"
            min={0}
            value={pageGap}
            onChange={(e) => setPageGap(Number(e.target.value))}
            className="w-32"
          />
        </div>
      </FileUploading>
      <DialogFooter>
        <Button type="submit" className="w-full bg-primary-maru hover:bg-opacity-80" disabled={isDisabled || isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isPending ? '파일을 업로드 하고 있어요...' : '업로드하기'}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default AdmissionDocuemntUploadForm;
