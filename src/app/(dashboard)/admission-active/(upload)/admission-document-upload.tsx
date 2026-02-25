import AdmissionDocuemntUploadForm from '@/app/(dashboard)/admission-active/(upload)/admission-document-upload-form';
import Button from '@/components/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

function AdmissionDocumentUpload() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="large">
          파일 업로드
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} className="w-full max-w-3xl p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl">파일 업로드</DialogTitle>
          <DialogDescription>선택한 전형에 필요한 파일을 업로드하세요</DialogDescription>
        </DialogHeader>
        <AdmissionDocuemntUploadForm handleDialogOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

export default AdmissionDocumentUpload;
