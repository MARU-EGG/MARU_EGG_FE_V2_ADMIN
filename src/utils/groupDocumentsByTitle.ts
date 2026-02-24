import { Document } from '@/types/document';

export function groupDocumentsByTitle(documents?: Document[]) {
  const seen = new Set<string>();
  return documents?.filter((doc) => {
    if (seen.has(doc.title)) return false;
    seen.add(doc.title);
    return true;
  });
}
