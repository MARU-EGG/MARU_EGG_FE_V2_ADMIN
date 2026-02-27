'use client';

import CollegeList from './_components/college-list';
import DepartmentPanel from './_components/department-panel';
import { useCollegesQuery } from './hooks/use-colleges-query';
import { cn } from '@/lib/utils';
import { Campus } from '@/types/college';
import { useState } from 'react';

const CAMPUS_TABS: Campus[] = ['인문캠퍼스', '자연캠퍼스'];

function MajorDetailClient() {
  const [selectedCampus, setSelectedCampus] = useState<Campus>('인문캠퍼스');
  const [selectedCollegeId, setSelectedCollegeId] = useState<number | null>(null);

  const { data: colleges = [] } = useCollegesQuery();
  const selectedCollege = colleges.find((c) => c.collegeId === selectedCollegeId) ?? null;

  const handleCampusChange = (campus: Campus) => {
    setSelectedCampus(campus);
    setSelectedCollegeId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-900">학과 관리</h1>
      </div>

      <div className="flex gap-0 border-b border-gray-200">
        {CAMPUS_TABS.map((campus) => (
          <button
            key={campus}
            type="button"
            onClick={() => handleCampusChange(campus)}
            className={cn(
              'px-6 py-3 text-sm font-semibold transition-colors',
              selectedCampus === campus
                ? 'border-b-2 border-primary-maru text-primary-maru'
                : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {campus}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        <CollegeList
          selectedCampus={selectedCampus}
          selectedCollegeId={selectedCollegeId}
          onSelectCollege={setSelectedCollegeId}
        />
        <DepartmentPanel selectedCollege={selectedCollege} />
      </div>
    </div>
  );
}

export default MajorDetailClient;
