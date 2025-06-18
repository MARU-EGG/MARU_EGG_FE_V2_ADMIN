'use client';

import Button from './button';
import Lists from './lists';
import { UploaderContext } from './uploader-context';
import { useState } from 'react';

type UploaderProps = {
  children: React.ReactNode;
};

function Uploader({ children }: UploaderProps) {
  const [listOpen, setListOpen] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  return (
    <UploaderContext.Provider value={{ listOpen, setListOpen, fileList, setFileList }}>
      <div>{children}</div>
    </UploaderContext.Provider>
  );
}

Uploader.Button = Button;
Uploader.Lists = Lists;

export default Uploader;
