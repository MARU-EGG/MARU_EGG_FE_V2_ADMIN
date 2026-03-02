'use client';

import AdmissionDetailFormDialog from './_components/admission-detail-form-dialog';
import AdmissionDetailItem from './_components/admission-detail-item';
import { useAdmissionDetailsQuery } from './hooks/use-admission-details-query';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ADMISSIONS, AdmissionType } from '@/types/admission';
import { Plus } from 'lucide-react';
import { useState } from 'react';

const ADMISSION_TABS = Object.entries(ADMISSIONS) as [AdmissionType, string][];

function AdmissionDetailClient() {
  const [selectedType, setSelectedType] = useState<AdmissionType>('SUSI');

  const { data: details = [] } = useAdmissionDetailsQuery(selectedType);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">입학 전형 상세 타입 관리</h1>
      </div>

      <div className="flex gap-0 border-b border-gray-200">
        {ADMISSION_TABS.map(([type, label]) => (
          <button
            key={type}
            type="button"
            onClick={() => setSelectedType(type)}
            className={cn(
              'px-6 py-3 text-sm font-semibold transition-colors',
              selectedType === type
                ? 'border-b-2 border-primary-maru text-primary-maru'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">상세 타입 목록</span>
          <span className="text-xs text-gray-400">{details.length}개</span>
        </div>

        <div className="flex flex-col divide-y overflow-hidden rounded-xl border border-gray-200">
          {details.map((detail) => (
            <AdmissionDetailItem key={detail.id} detail={detail} type={selectedType} />
          ))}
          {details.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-gray-400">등록된 상세 타입이 없어요</p>
          )}
        </div>

        <AdmissionDetailFormDialog mode="create" type={selectedType}>
          <Button variant="outline" className="flex w-full items-center justify-center gap-1">
            <Plus size={14} />
            상세 타입 추가
          </Button>
        </AdmissionDetailFormDialog>
      </div>
    </div>
  );
}

export default AdmissionDetailClient;
