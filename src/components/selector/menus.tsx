'use client';

import { useSelectorContext } from '@/components/selector/selector-context';
import { cn } from '@/utils/style';

type menusProps = {
  children: React.ReactNode;
};

function Menus({ children }: menusProps) {
  const { isOpen, size } = useSelectorContext();
  const menusStyle = cn(
    'absolute z-10 mt-12 rounded-md bg-monotone-white px-3 py-2 drop-shadow-[0_0_1px_rgba(37,37,40,0.32)]',
    size === 'small' ? 'w-44' : 'w-60',
  );
  return isOpen && <div className={menusStyle}>{children}</div>;
}

export default Menus;
