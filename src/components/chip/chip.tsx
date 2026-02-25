'use client';

import { cn } from '@/lib/utils';

type ChipProps = {
  label: string;
  status: 'success' | 'error';
};

function Chip({ label, status }: ChipProps) {
  const baseStyle = 'w-fit rounded px-3 py-1.5 text-xs font-semibold ring-1 ring-inset';

  const statusStyle = cn(
    status === 'error' && 'ring-error bg-error/10 text-error',
    status === 'success' && 'ring-success bg-success/10 text-success',
  );

  return <div className={cn(baseStyle, statusStyle)}>{label}</div>;
}

export default Chip;
