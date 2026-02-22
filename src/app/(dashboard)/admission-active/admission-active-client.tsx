'use client';

import { ADMISSIONS, ADMISSIONS_CATEGORIES, AdmissionCategoryType, AdmissionType } from './../../../types/admission';
import AdmissionActiveSwitch from '@/app/(dashboard)/admission-active/admission-active-switch';
import useDocumentsQuery from '@/app/(dashboard)/admission-active/hooks/use-documents-query';
import Selector from '@/components/selector';
import { useState } from 'react';

function AdmissionActiveClient() {
  const [selectedAdmissionType, setSelectedAdmissionType] = useState<AdmissionType>('SUSI');
  const [selectedCategory, setSelectedCategory] = useState<AdmissionCategoryType>('ADMISSION_GUIDE');

  const { data } = useDocumentsQuery({
    type: ADMISSIONS[selectedAdmissionType],
    category: ADMISSIONS_CATEGORIES[selectedCategory],
  });

  console.log(data?.documents);

  return (
    <div className="flex items-center gap-16">
      <span>전형을 선택해주세요</span>
      <div className="flex items-center gap-3">
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
        <Selector value={ADMISSIONS_CATEGORIES[selectedCategory]}>
          <Selector.Trigger placeholder="" />
          <Selector.Menus>
            {Object.entries(ADMISSIONS_CATEGORIES).map(([value, label]) => (
              <Selector.Menu
                key={value}
                value={value}
                label={label}
                onClick={(value) => setSelectedCategory(value as AdmissionCategoryType)}
              />
            ))}
          </Selector.Menus>
        </Selector>
        <AdmissionActiveSwitch selectedAdmissionType={selectedAdmissionType} />
      </div>
    </div>
  );
}

export default AdmissionActiveClient;
