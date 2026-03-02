'use client';

import AdmissionDetailFormDialog from './admission-detail-form-dialog';
import { useDeleteAdmissionDetailMutation } from '../hooks/use-admission-detail-mutations';
import DeleteConfirmDialog from '@/components/delete-confirm-dialog/delete-confirm-dialog';
import { AdmissionType } from '@/types/admission';
import { Pencil, Trash2 } from 'lucide-react';

type AdmissionDetailItemProps = {
  detail: { id: number; name: string };
  type: AdmissionType;
};

function AdmissionDetailItem({ detail, type }: AdmissionDetailItemProps) {
  const { mutate: deleteDetail } = useDeleteAdmissionDetailMutation(type);

  return (
    <div className="flex items-center justify-between px-4 py-3 transition-colors first:rounded-t-xl last:rounded-b-xl hover:bg-gray-50">
      <span className="text-sm font-medium text-gray-800">{detail.name}</span>
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <AdmissionDetailFormDialog mode="edit" type={type} detail={detail}>
          <button
            type="button"
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <Pencil size={13} />
          </button>
        </AdmissionDetailFormDialog>
        <DeleteConfirmDialog
          name={`"${detail.name}" 타입을 삭제하시겠어요?`}
          description="삭제된 상세 타입은 복구할 수 없어요."
          onConfirm={() => deleteDetail(String(detail.id))}
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

export default AdmissionDetailItem;
