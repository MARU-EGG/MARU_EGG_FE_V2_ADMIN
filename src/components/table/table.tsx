import { cn } from '@/lib/utils';

type TableProps = {
  children: React.ReactNode;
  columnWidths?: string[];
};

function Table({ children, columnWidths }: TableProps) {
  return (
    <table className={cn('w-full', columnWidths && 'table-fixed')}>
      {columnWidths && (
        <colgroup>
          {columnWidths.map((width, i) => (
            <col key={i} style={{ width }} />
          ))}
        </colgroup>
      )}
      {children}
    </table>
  );
}

export default Table;
