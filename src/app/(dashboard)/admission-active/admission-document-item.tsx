import AdmissioDocumentDeleteDialog from '@/app/(dashboard)/admission-active/admission-document-delete-dialog';
import { AdmissionLabel } from '@/types/admission';
import { Document } from '@/types/document';
import { Download, FileText } from 'lucide-react';

function AdmissionDocumentItem({ document, type }: { document: Document; type: AdmissionLabel }) {
  const DOCUMENT_URL = `${process.env.NEXT_PUBLIC_DOCUMENTS_BASE_URL}${document.title}`;
  const { title, category, created_at } = document;

  return (
    <div className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50">
      <FileText size={20} className="shrink-0 text-primary-maru" />
      <a
        href={DOCUMENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 cursor-pointer text-sm font-semibold underline-offset-4 hover:underline"
      >
        {title}
      </a>
      <span className="shrink-0 text-xs text-gray-600">{category}</span>
      <span className="shrink-0 text-xs text-gray-600">{new Date(created_at).toLocaleDateString('ko-KR')}</span>
      <div className="flex shrink-0 items-center gap-2">
        <Download
          size={16}
          className="text-gray-400 transition-colors hover:text-gray-700"
          onClick={(e) => {
            e.stopPropagation();
            window.open(DOCUMENT_URL, '_blank');
          }}
        />
        <AdmissioDocumentDeleteDialog title={title} type={type} category={category} />
      </div>
    </div>
  );
}

export default AdmissionDocumentItem;
