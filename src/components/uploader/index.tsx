'use client';

import Button from './button';
import Lists from './lists';
import { UploaderContext } from './uploader-context';
import { useEffect, useState } from 'react';

type UploaderProps = {
  children: React.ReactNode;
  onFilesChange?: (files: File[]) => void;
};

function Uploader({ children, onFilesChange }: UploaderProps) {
  const [listOpen, setListOpen] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);

  useEffect(() => {
    onFilesChange?.(fileList);
  }, [fileList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <UploaderContext.Provider value={{ listOpen, setListOpen, fileList, setFileList }}>
      <div>{children}</div>
    </UploaderContext.Provider>
  );
}

Uploader.Button = Button;
Uploader.Lists = Lists;

export default Uploader;
