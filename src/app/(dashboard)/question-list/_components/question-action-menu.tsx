'use client';

import { useEffect, useRef, useState } from 'react';
import DeleteConfirmDialog from '@/components/delete-confirm-dialog/delete-confirm-dialog';

type QuestionActionMenuProps = {
  onEdit: () => void;
  onDelete: () => void;
};

function QuestionActionMenu({ onEdit, onDelete }: QuestionActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="4" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-10 mt-1 flex w-24 flex-col rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          <button
            type="button"
            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              onEdit();
            }}
          >
            수정하기
          </button>
          <button
            type="button"
            className="w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              setIsDeleteDialogOpen(true);
            }}
          >
            삭제하기
          </button>
        </div>
      )}

      <DeleteConfirmDialog
        name="이 질문을 삭제하시겠어요?"
        description="삭제된 질문은 복구할 수 없어요."
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={onDelete}
      />
    </div>
  );
}

export default QuestionActionMenu;
