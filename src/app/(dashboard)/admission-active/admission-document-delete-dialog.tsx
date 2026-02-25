import useAdmissionDeleteDocument from '@/app/(dashboard)/admission-active/hooks/use-admission-delete-document';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { AdmissionCategoryLabel, AdmissionLabel } from '@/types/admission';
import { AlertDialogAction, AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';

type AdmissionDocumentDeleteDialogProps = {
  title: string;
  type: AdmissionLabel;
  category: AdmissionCategoryLabel;
};

function AdmissioDocumentDeleteDialog({ title, type, category }: AdmissionDocumentDeleteDialogProps) {
  const queryClient = useQueryClient();
  const { mutate } = useAdmissionDeleteDocument();

  const handleDelete = () => {
    mutate(
      { type, category },
      {
        onSuccess: () => {
          queryClient.refetchQueries({ queryKey: ['documents', type] });
        },
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash2
          size={16}
          className="text-gray-400 transition-colors hover:text-red-500"
          onClick={(e) => e.stopPropagation()}
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-sm overflow-hidden rounded-xl p-0" onClick={(e) => e.stopPropagation()}>
        {/* 상단 아이콘 영역 */}
        <div className="flex flex-col items-center gap-3 bg-red-50 px-6 pb-6 pt-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Trash2 size={22} className="text-red-500" />
          </div>
          <AlertDialogHeader className="items-center space-y-1 text-center">
            <AlertDialogTitle className="text-base font-semibold text-gray-900">
              파일을 삭제하시겠어요?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed text-gray-500">
              <span className="font-medium text-gray-700">"{title}"</span> 파일이 영구적으로 삭제됩니다. <br />
              삭제된 파일은 복구할 수 없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter className="flex flex-row gap-2 bg-white px-6 py-4">
          <AlertDialogCancel asChild className="m-0 flex-1">
            <Button variant="secondary" className="w-full">
              취소
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild className="flex-1">
            <Button onClick={handleDelete} variant="destructive" color="red" className="w-full">
              삭제
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AdmissioDocumentDeleteDialog;
