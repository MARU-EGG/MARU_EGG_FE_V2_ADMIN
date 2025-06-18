'use client';

import React, { createContext, useContext } from 'react';

type UploaderContextType = {
  listOpen: boolean;
  setListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileList: File[];
  setFileList: React.Dispatch<React.SetStateAction<File[]>>;
};

export const UploaderContext = createContext<UploaderContextType | undefined>(undefined);

export function useUploaderContext() {
  const context = useContext(UploaderContext);
  if (!context) {
    throw new Error('useUploaderContext must be used within a UploaderProvider');
  }
  return context;
}
