import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type TableCellProps = {
  children: ReactNode;
  isHeader?: boolean;
} & HTMLAttributes<HTMLTableCellElement>;

function TableCell({ children, isHeader = false, className, ...rest }: TableCellProps) {
  if (isHeader) {
    return (
      <th align="left" className={cn('h-[52px] px-3 text-sm font-semibold', className)} {...rest}>
        {children}
      </th>
    );
  }

  return (
    <td
      align="left"
      className={cn(
        'h-[52px] overflow-hidden text-ellipsis whitespace-nowrap border-b border-grayscale-gray-30 px-3',
        className,
      )}
      {...rest}
    >
      {children}
    </td>
  );
}

export default TableCell;
