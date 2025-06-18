'use client';

import { useUploaderContext } from './uploader-context';
import CloseIcon from '@public/svg/close.svg';
import Image from 'next/image';

type ListProps = {
  fileName: string;
  index: number;
};

function List({ fileName, index }: ListProps) {
  const { setFileList } = useUploaderContext();
  const handleRemove = () => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="flex min-w-60 max-w-60 justify-between rounded-lg bg-grayscale-gray-10 px-4 py-2">
      <p className="truncate text-xs font-medium text-grayscale-gray-70">{fileName}</p>
      <button onClick={handleRemove} className="cursor-pointer">
        <Image className="fill-grayscale-gray-80" src={CloseIcon} alt="클로즈 아이콘" />
      </button>
    </div>
  );
}

export default List;
