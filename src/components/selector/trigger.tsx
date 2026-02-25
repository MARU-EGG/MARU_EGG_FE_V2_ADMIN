'use client';

import { useSelectorContext } from '@/components/selector/selector-context';
import { cn } from '@/lib/utils';
import cheveronBottomIcon from '@public/svg/chevron-bottom.svg';
import Image from 'next/image';
import React from 'react';

type TriggerProps = {
  placeholder: string;
};

function Trigger({ placeholder }: TriggerProps) {
  const { setIsOpen, triggerLabel, size } = useSelectorContext();

  const triggerStyle = cn(
    'rounded-lg bg-monotone-white px-4 py-3 drop-shadow-[0_0_1px_rgba(37,37,40,0.32)]',
    size === 'small' ? 'w-44' : 'w-60',
  );

  return (
    <div className={triggerStyle}>
      <div className="flex justify-between" onClick={() => setIsOpen((prev) => !prev)}>
        <p className="cursor-default font-semibold leading-tight text-grayscale-gray-70">
          {triggerLabel || placeholder}
        </p>
        <button type="button" className="ml-2 cursor-pointer">
          <Image src={cheveronBottomIcon} alt="셀렉트 열기" />
        </button>
      </div>
    </div>
  );
}

export default Trigger;
