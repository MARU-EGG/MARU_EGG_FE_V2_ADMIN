import file_loading from '@/assets/lottie/file_loading.json';
import Lottie from 'lottie-react';
import { ReactNode } from 'react';

type FileUploadingProps = {
  isLoading: boolean;
  children: ReactNode;
};

function FileUploading({ isLoading, children }: FileUploadingProps) {
  return (
    <div className="relative">
      <div className={isLoading ? 'invisible' : 'visible'}>{children}</div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Lottie animationData={file_loading} loop={true} />
        </div>
      )}
    </div>
  );
}

export default FileUploading;
