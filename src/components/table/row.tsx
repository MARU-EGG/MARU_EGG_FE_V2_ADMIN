import { ReactNode } from 'react';

function TableRow({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>;
}

export default TableRow;
