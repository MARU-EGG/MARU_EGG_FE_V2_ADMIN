'use client';

import CloseIcon from '@public/svg/close.svg';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function UploadModal() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative flex w-full max-w-lg flex-col gap-6 rounded-xl bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-grayscale-gray-90">파일 업로드</h2>
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer rounded p-1 transition-colors hover:bg-grayscale-gray-10"
            aria-label="모달 닫기"
          >
            <Image src={CloseIcon} alt="닫기" />
          </button>
        </div>

        <div className="min-h-[120px]" />
      </div>
    </div>
  );
}
