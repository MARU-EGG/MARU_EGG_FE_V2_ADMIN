'use client';

import Button from './button';
import Lists from './lists';
import { UploaderContext } from './uploader-context';
import { useEffect, useState } from 'react';

type UploaderProps = {
  mode?: 'single' | 'multiple';
  children: React.ReactNode;
  onFileChange?: (files: File[]) => void;
};

function Uploader({ children, onFileChange, mode = 'multiple' }: UploaderProps) {
  const [listOpen, setListOpen] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);

  const handleSetFileList = (files: File[] | ((prev: File[]) => File[])) => {
    setFileList((prev) => {
      const next = typeof files === 'function' ? files(prev) : files;
      if (next.length === 0) return [];
      return mode === 'single' ? [next.at(-1)!] : next;
    });
  };

  useEffect(() => {
    onFileChange?.(fileList);
  }, [fileList]);

  return (
    <UploaderContext.Provider value={{ mode, listOpen, setListOpen, fileList, setFileList: handleSetFileList }}>
      <div>{children}</div>
    </UploaderContext.Provider>
  );
}

Uploader.Button = Button;
Uploader.Lists = Lists;

export default Uploader;
