'use client';

import { useEffect, useRef, useState } from 'react';
import { ToastItemData } from './classes/toast-item';
import { toastStore } from './classes/toast-store';
import { cn } from '@/utils/style';

type ToastItemProps = {
  item: ToastItemData;
};

function ToastItem({ item }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleClose = () => {
    setIsRemoving(true);
  };

  const handleTransitionEnd = () => {
    if (isRemoving) {
      toastStore.close(item.id);
    }
  };

  const typeStyle = cn(
    'rounded px-4 py-3 text-sm font-semibold ring-1 ring-inset',
    item.type === 'success' && 'bg-success/10 text-success ring-success',
    item.type === 'error' && 'bg-error/10 text-error ring-error',
    item.type === 'default' && 'bg-white text-grayscale-gray-70 ring-grayscale-gray-20',
  );

  const animationStyle = cn(
    'transition-all duration-300 ease-in-out',
    isVisible && !isRemoving ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
  );

  return (
    <div
      ref={ref}
      className={cn(typeStyle, animationStyle, 'flex min-w-[220px] items-center justify-between gap-4 shadow-md')}
      onTransitionEnd={handleTransitionEnd}
    >
      <span>{item.message}</span>
      <button
        onClick={handleClose}
        className="flex-shrink-0 cursor-pointer text-base leading-none opacity-60 hover:opacity-100"
        aria-label="닫기"
      >
        ✕
      </button>
    </div>
  );
}

export default ToastItem;
