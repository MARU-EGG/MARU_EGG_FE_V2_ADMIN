'use client';

import { useSelectorContext } from '@/components/selector/selector-context';
import { cn } from '@/utils/style';
import cheveronBottomIcon from '@public/svg/chevron-bottom.svg';
import Image from 'next/image';
import React, { useEffect } from 'react';

type TriggerProps = {
  children: string;
};

function Trigger({ children }: TriggerProps) {
  const { isOpen, setIsOpen, triggerLabel, setTriggerLabel, size } = useSelectorContext();

  useEffect(() => {
    if (!triggerLabel && children) {
      setTriggerLabel(children);
    }
  });

  const triggerStyle = cn(
    'rounded-lg bg-monotone-white px-4 py-3 drop-shadow-[0_0_1px_rgba(37,37,40,0.32)]',
    size === 'small' ? 'w-44' : 'w-60',
  );

  return (
    <div className={triggerStyle}>
      <div className="flex justify-between">
        <p className="font-semibold leading-tight text-grayscale-gray-70">{triggerLabel || children}</p>
        <button onClick={() => setIsOpen(!isOpen)} className="ml-2 cursor-pointer">
          <Image src={cheveronBottomIcon} alt="셀렉트 열기" />
        </button>
      </div>
    </div>
  );
}

export default Trigger;
