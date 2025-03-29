import { ReactNode } from 'react';

function TableHead({ children }: { children: ReactNode }) {
  return <thead className="h-10 border-b border-grayscale-gray-30 bg-grayscale-gray-10">{children}</thead>;
}

export default TableHead;
