'use client';

import { useUploaderContext } from './uploader-context';
import UploaderIcon from '@public/svg/uploader.svg';
import Image from 'next/image';
import React from 'react';

function Button() {
  const { setListOpen, setFileList, fileList } = useUploaderContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = Array.from(e.target.files ?? []);
    setListOpen(true);
    setFileList([...fileList, ...newFile]);
  };

  return (
    <>
      <label htmlFor="file" className="mb-2 inline-block">
        <div className="flex h-fit w-fit cursor-pointer gap-1 rounded-lg border border-grayscale-gray-20 bg-monotone-white px-4 py-3 text-center text-sm font-semibold text-grayscale-gray-70">
          <Image src={UploaderIcon} alt="업로드 아이콘" />
          파일 업로드를 위해 클릭해주세요
        </div>
      </label>
      <input onChange={handleChange} id="file" className="invisible" type="file" multiple />
    </>
  );
}

export default Button;
