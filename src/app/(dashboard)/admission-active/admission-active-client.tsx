'use client';

import { ADMISSIONS, AdmissionType } from './../../../types/admission';
import AdmissionActiveSwitch from '@/app/(dashboard)/admission-active/admission-active-switch';
import AdmissionDocumentItem from '@/app/(dashboard)/admission-active/admission-document-item';
import useDocumentsQuery from '@/app/(dashboard)/admission-active/hooks/use-documents-query';
import Button from '@/components/button/button';
import Selector from '@/components/selector';
import { groupDocumentsByTitle } from '@/utils/groupDocumentsByTitle';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function AdmissionActiveClient() {
  const router = useRouter();
  const [selectedAdmissionType, setSelectedAdmissionType] = useState<AdmissionType>('SUSI');

  const { data } = useDocumentsQuery({
    type: ADMISSIONS[selectedAdmissionType],
  });

  const label = ADMISSIONS[selectedAdmissionType];
  const documents = groupDocumentsByTitle(data?.documents[label]);

  return (
    <div className="flex flex-col gap-20">
      <div className="flex items-center gap-12">
        <span>전형을 선택해주세요</span>
        <div className="flex flex-1 items-center gap-6">
          <Selector value={ADMISSIONS[selectedAdmissionType]}>
            <Selector.Trigger placeholder="" />
            <Selector.Menus>
              {Object.entries(ADMISSIONS).map(([value, label]) => (
                <Selector.Menu
                  key={value}
                  value={value}
                  label={label}
                  onClick={(value) => setSelectedAdmissionType(value as AdmissionType)}
                />
              ))}
            </Selector.Menus>
          </Selector>
          <AdmissionActiveSwitch selectedAdmissionType={selectedAdmissionType} />
          <div className="ml-auto">
            <Button variant="primary" size="large" onClick={() => router.push('/admission-active/upload')}>
              파일 업로드
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col divide-y rounded-xl border border-gray-200">
        {documents?.map((document) => <AdmissionDocumentItem key={document.id} document={document} />)}
      </div>
    </div>
  );
}

export default AdmissionActiveClient;
