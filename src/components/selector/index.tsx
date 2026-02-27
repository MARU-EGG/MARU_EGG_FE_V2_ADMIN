'use client';

import Menu from '@/components/selector/menu';
import Menus from '@/components/selector/menus';
import { SelectorContext } from '@/components/selector/selector-context';
import Trigger from '@/components/selector/trigger';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

type SelectorProps = {
  value?: string;
  children: React.ReactNode;
  selectorSize?: 'small' | 'large';
};

function Selector({ value, children, selectorSize = 'small' }: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLabel, setTriggerLabel] = useState(value ?? '');
  const size = selectorSize;
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
    <SelectorContext.Provider value={{ isOpen, setIsOpen, triggerLabel, setTriggerLabel, size }}>
      <div ref={ref} className="relative z-20 flex flex-col">
        {children}
      </div>
    </SelectorContext.Provider>
  );
}

Selector.Trigger = Trigger;
Selector.Menu = Menu;
Selector.Menus = Menus;

export default Selector;
