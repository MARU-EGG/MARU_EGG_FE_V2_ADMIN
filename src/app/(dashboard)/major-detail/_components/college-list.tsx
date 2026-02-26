'use client';

import CollegeFormDialog from './college-form-dialog';
import CollegeItem from './college-item';
import { useCollegesQuery } from '../hooks/use-colleges-query';
import Button from '@/components/button/button';
import { Plus } from 'lucide-react';

type CollegeListProps = {
  selectedCampus: Campus;
  selectedCollegeId: number | null;
  onSelectCollege: (id: number) => void;
};

function CollegeList({ selectedCampus, selectedCollegeId, onSelectCollege }: CollegeListProps) {
  const { data: colleges = [] } = useCollegesQuery();
  const filteredColleges = colleges.filter((c) => c.campus === selectedCampus);

  return (
    <div className="flex w-64 shrink-0 flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-700">대학 목록</span>
        <span className="text-xs text-gray-400">{filteredColleges.length}개</span>
      </div>
      <div className="flex flex-col divide-y rounded-xl border border-gray-200 overflow-hidden">
        {filteredColleges.map((college) => (
          <CollegeItem
            key={college.collegeId}
            college={college}
            isSelected={college.collegeId === selectedCollegeId}
            onSelect={() => onSelectCollege(college.collegeId)}
          />
        ))}
        {filteredColleges.length === 0 && (
          <p className="px-4 py-8 text-center text-sm text-gray-400">등록된 대학이 없어요</p>
        )}
      </div>
      <CollegeFormDialog mode="create" selectedCampus={selectedCampus}>
        <Button variant="secondary" size="large" className="flex w-full items-center justify-center gap-1">
          <Plus size={14} />
          대학 추가
        </Button>
      </CollegeFormDialog>
    </div>
  );
}

export default CollegeList;
