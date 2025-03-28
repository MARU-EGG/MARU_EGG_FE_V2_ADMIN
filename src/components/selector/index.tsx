'use client';

import Menu from './menu';
import Menus from './menus';
import { SelectorContext } from './selector-context';
import Trigger from '@/components/selector/trigger';
import { useState } from 'react';

type SelectorProps = {
  children: React.ReactNode;
  selectorSize?: 'small' | 'large';
};

function Selector({ children, selectorSize = 'small' }: SelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLabel, setTriggerLabel] = useState('');
  const size = selectorSize;
  return (
    <SelectorContext.Provider value={{ isOpen, setIsOpen, triggerLabel, setTriggerLabel, size }}>
      <div className="flex flex-col">{children}</div>
    </SelectorContext.Provider>
  );
}

Selector.Trigger = Trigger;
Selector.Menu = Menu;
Selector.Menus = Menus;

export default Selector;
