'use client';

import Pagination from './_components/pagination';
import QuestionActionMenu from './_components/question-action-menu';
import QuestionEditDialog from './_components/question-edit-dialog';
import { useDeleteQuestionMutation } from './hooks/use-question-mutations';
import { useQuestionsQuery } from './hooks/use-questions-query';
import Chip from '@/components/chip/chip';
import Selector from '@/components/selector';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/table';
import { cn } from '@/lib/utils';
import type { AdmissionType } from '@/types/admission';
import { ADMISSIONS } from '@/types/admission';
import type { QuestionItem } from '@/types/questions';
import { useMemo, useState, useTransition } from 'react';

const PAGE_SIZE = 10;

type ViewCountSort = 'none' | 'asc' | 'desc';
type CheckedFilter = 'all' | 'checked' | 'unchecked';

const SORT_CYCLE: Record<ViewCountSort, ViewCountSort> = {
  none: 'desc',
  desc: 'asc',
  asc: 'none',
};

const SORT_ICON: Record<ViewCountSort, string> = {
  none: '↕',
  asc: '↑',
  desc: '↓',
};

const CHECKED_FILTER_OPTIONS: { value: CheckedFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'checked', label: '확인' },
  { value: 'unchecked', label: '미확인' },
];

function QuestionListClient() {
  const [selectedType, setSelectedType] = useState<AdmissionType>('SUSI');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewCountSort, setViewCountSort] = useState<ViewCountSort>('none');
  const [checkedFilter, setCheckedFilter] = useState<CheckedFilter>('all');

  const [editQuestion, setEditQuestion] = useState<QuestionItem | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const { data: questions } = useQuestionsQuery(selectedType);

  const deleteQuestionMutation = useDeleteQuestionMutation();

  const filteredQuestions = useMemo(() => {
    let result = questions;

    if (checkedFilter === 'checked') result = result.filter((q) => q.isChecked);
    else if (checkedFilter === 'unchecked') result = result.filter((q) => !q.isChecked);

    if (viewCountSort === 'asc') result = [...result].sort((a, b) => a.viewCount - b.viewCount);
    else if (viewCountSort === 'desc') result = [...result].sort((a, b) => b.viewCount - a.viewCount);

    return result;
  }, [questions, checkedFilter, viewCountSort]);

  const totalPages = Math.ceil(filteredQuestions.length / PAGE_SIZE);
  const paginatedQuestions = useMemo(
    () => filteredQuestions.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filteredQuestions, currentPage],
  );

  const handleTypeChange = (type: AdmissionType) => {
    startTransition(() => {
      setSelectedType(type);
      setCurrentPage(1);
    });
  };

  const handleSortToggle = () => {
    setViewCountSort((prev) => SORT_CYCLE[prev]);
    setCurrentPage(1);
  };

  const handleCheckedFilterChange = (filter: CheckedFilter) => {
    setCheckedFilter(filter);
    setCurrentPage(1);
  };

  const handleEdit = (question: QuestionItem) => {
    setEditQuestion(question);
    setIsEditOpen(true);
  };

  const handleDelete = (questionId: number) => {
    deleteQuestionMutation.mutate({ id: questionId });
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-gray-900">질문 목록</h1>

      <div className="flex items-end gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">전형을 선택해주세요</span>
          <Selector value={ADMISSIONS[selectedType]}>
            <Selector.Trigger placeholder="전형 선택" />
            <Selector.Menus>
              {Object.entries(ADMISSIONS).map(([value, label]) => (
                <Selector.Menu
                  key={value}
                  value={value}
                  label={label}
                  onClick={(value) => handleTypeChange(value as AdmissionType)}
                />
              ))}
            </Selector.Menus>
          </Selector>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-gray-700">확인 여부</span>
          <div className="flex gap-2">
            {CHECKED_FILTER_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleCheckedFilterChange(value)}
                className={cn(
                  'rounded px-3 py-1.5 text-xs font-semibold ring-1 ring-inset transition-colors',
                  checkedFilter === value
                    ? 'bg-primary-maru/10 text-primary-maru ring-primary-maru'
                    : 'bg-white text-gray-500 ring-gray-300 hover:bg-gray-50',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={cn('flex flex-col gap-6 transition-opacity', isPending && 'pointer-events-none opacity-50')}>
        {filteredQuestions.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500">
            {questions.length === 0 ? '질문이 없습니다.' : '조건에 맞는 질문이 없습니다.'}
          </div>
        ) : (
          <>
            <Table columnWidths={['75%', '10%', '10%', '5%']}>
              <TableHead>
                <TableRow>
                  <TableCell isHeader>질문 내용</TableCell>
                  <TableCell isHeader>
                    <button onClick={handleSortToggle} className="flex cursor-pointer items-center gap-1">
                      조회 횟수
                      <span className="text-xs text-gray-400">{SORT_ICON[viewCountSort]}</span>
                    </button>
                  </TableCell>
                  <TableCell isHeader>질문 확인 여부</TableCell>
                  <TableCell isHeader>{''}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedQuestions.map((question) => (
                  <TableRow key={question.id}>
                    <TableCell>{question.content}</TableCell>
                    <TableCell>{question.viewCount}</TableCell>
                    <TableCell>
                      <Chip
                        label={question.isChecked ? '확인' : '미확인'}
                        status={question.isChecked ? 'success' : 'error'}
                      />
                    </TableCell>
                    <TableCell className="overflow-visible">
                      <QuestionActionMenu
                        onEdit={() => handleEdit(question)}
                        onDelete={() => handleDelete(question.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </>
        )}
      </div>

      <QuestionEditDialog question={editQuestion} open={isEditOpen} onOpenChange={setIsEditOpen} />
    </div>
  );
}

export default QuestionListClient;
