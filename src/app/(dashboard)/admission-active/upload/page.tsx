import Link from 'next/link';

export default function UploadPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-grayscale-gray-90">파일 업로드</h1>
        <Link
          href="/admission-active"
          className="rounded border px-3 py-1.5 text-xs font-semibold text-grayscale-gray-70 transition-colors hover:bg-grayscale-gray-10"
        >
          돌아가기
        </Link>
      </div>
    </div>
  );
}
