import { HTMLAttributes, ReactNode } from 'react';

type TableCellProps = {
  children: ReactNode;
  isHeader?: boolean;
} & HTMLAttributes<HTMLTableCellElement>;

function TableCell({ children, isHeader = false, ...rest }: TableCellProps) {
  if (isHeader) {
    return (
      <th align="left" className={`h-[52px] px-3 text-sm font-semibold`} {...rest}>
        {children}
      </th>
    );
  }

  return (
    <td align="left" className={`h-[52px] border-b border-grayscale-gray-30 px-3`} {...rest}>
      <div className="max-w-[624px] overflow-hidden text-ellipsis whitespace-nowrap">{children}</div>
    </td>
  );
}

export default TableCell;
