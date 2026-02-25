'use client';

import { ToastPosition } from './classes/toast-item';
import { useToast } from './hooks/use-toast';
import ToastItem from './toast-item';
import { cn } from '@/lib/utils';

const positionStyles: Record<ToastPosition, string> = {
  'top-left': 'fixed top-4 left-4',
  'top-center': 'fixed top-4 left-1/2 -translate-x-1/2',
  'top-right': 'fixed top-4 right-4',
  'middle-left': 'fixed top-1/2 left-4 -translate-y-1/2',
  'middle-right': 'fixed top-1/2 right-4 -translate-y-1/2',
  'bottom-left': 'fixed bottom-4 left-4',
  'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'fixed bottom-4 right-4',
};

type ToastContainerProps = {
  position: ToastPosition;
};

function ToastContainer({ position }: ToastContainerProps) {
  const toasts = useToast();
  const filtered = toasts.filter((t) => t.position === position);

  if (filtered.length === 0) return null;

  return (
    <div className={cn(positionStyles[position], 'z-[9999] flex flex-col gap-2')}>
      {filtered.map((item) => (
        <ToastItem key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ToastContainer;
