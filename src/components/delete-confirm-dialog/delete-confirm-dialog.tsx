'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';

type DeleteConfirmDialogProps = {
  name: string;
  description: string;
  onConfirm: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
};

function DeleteConfirmDialog({
  name,
  description,
  onConfirm,
  open,
  onOpenChange,
  children,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {children && (
        <AlertDialogTrigger asChild onClick={(e) => e.stopPropagation()}>
          {children}
        </AlertDialogTrigger>
      )}
      <AlertDialogContent
        className="max-w-sm overflow-hidden rounded-xl p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center gap-3 bg-red-50 px-6 pb-6 pt-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <Trash2 size={22} className="text-red-500" />
          </div>
          <AlertDialogHeader className="items-center space-y-1 text-center">
            <AlertDialogTitle className="text-base font-semibold text-gray-900">
              {name}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed text-gray-500">
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter className="flex flex-row gap-2 bg-white px-6 py-4">
          <AlertDialogCancel className="m-0 flex-1" onClick={(e) => e.stopPropagation()}>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className="flex-1 bg-red-500 text-white hover:bg-red-600"
            onClick={(e) => {
              e.stopPropagation();
              onConfirm();
            }}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteConfirmDialog;
