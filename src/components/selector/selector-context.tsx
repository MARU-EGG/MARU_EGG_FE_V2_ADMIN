'use client';

import { createContext, useContext } from 'react';

type SelectorContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  triggerLabel: string;
  setTriggerLabel: (value: string) => void;
  size: 'small' | 'large';
};

export const SelectorContext = createContext<SelectorContextType | undefined>(undefined);

export function useSelectorContext() {
  const context = useContext(SelectorContext);
  if (!context) {
    throw new Error('useSelectorContext must be used within a FlyOutProvider');
  }
  return context;
}
