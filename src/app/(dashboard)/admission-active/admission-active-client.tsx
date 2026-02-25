'use client';

import { ADMISSIONS, AdmissionType } from './../../../types/admission';
import AdmissionDocumentUpload from '@/app/(dashboard)/admission-active/(upload)/admission-document-upload';
import AdmissionActiveSwitch from '@/app/(dashboard)/admission-active/admission-active-switch';
import AdmissionDocumentItem from '@/app/(dashboard)/admission-active/admission-document-item';
import useDocumentsQuery from '@/app/(dashboard)/admission-active/hooks/use-documents-query';
import Selector from '@/components/selector';
import { groupDocumentsByTitle } from '@/utils/groupDocumentsByTitle';
import { useState } from 'react';

function AdmissionActiveClient() {
  const [selectedAdmissionType, setSelectedAdmissionType] = useState<AdmissionType>('SUSI');
  const label = ADMISSIONS[selectedAdmissionType];

  const { data } = useDocumentsQuery({
    type: label,
  });

  const documents = groupDocumentsByTitle(data?.documents[label]);

  return (
    <div className="flex flex-col gap-20">
      <div className="flex items-center gap-12">
        <span>전형을 선택해주세요</span>
        <div className="flex flex-1 items-center gap-6">
          <Selector value={label}>
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
            <AdmissionDocumentUpload />
          </div>
        </div>
      </div>
      <div className="flex flex-col divide-y rounded-xl border border-gray-200">
        {documents?.map((document) => <AdmissionDocumentItem key={document.id} type={label} document={document} />)}
      </div>
    </div>
  );
}

export default AdmissionActiveClient;
