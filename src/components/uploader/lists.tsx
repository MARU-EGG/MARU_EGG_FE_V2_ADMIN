'use client';

import List from './list';
import { useUploaderContext } from './uploader-context';

function Lists() {
  const { listOpen, fileList } = useUploaderContext();
  if (!listOpen) return null;
  return (
    <div className="flex flex-wrap gap-2 overflow-x-auto scrollbar-hide">
      {fileList.map((v, i) => (
        <List key={`${v.name}-${i}`} fileName={v.name} index={i} />
      ))}
    </div>
  );
}

export default Lists;
