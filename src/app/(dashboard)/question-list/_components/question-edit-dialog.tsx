'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import Selector from '@/components/selector';
import Button from '@/components/button/button';
import { ADMISSIONS, ADMISSIONS_CATEGORIES } from '@/types/admission';
import type { AdmissionType, AdmissionCategoryType } from '@/types/admission';
import type { QuestionItem } from '@/types/questions';
import {
  useEditQuestionMutation,
  useEditAnswerMutation,
  useVerifyQAMutation,
} from '../hooks/use-question-mutations';

type QuestionEditDialogProps = {
  question: QuestionItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function QuestionEditDialog({ question, open, onOpenChange }: QuestionEditDialogProps) {
  const editQuestionMutation = useEditQuestionMutation();
  const editAnswerMutation = useEditAnswerMutation();
  const verifyQAMutation = useVerifyQAMutation();

  const [selectedType, setSelectedType] = useState<AdmissionType>('SUSI');
  const [selectedCategory, setSelectedCategory] =
    useState<AdmissionCategoryType>('ADMISSION_GUIDELINE');
  const [questionContent, setQuestionContent] = useState('');
  const [answerContent, setAnswerContent] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (question) {
      setQuestionContent(question.content);
      setAnswerContent(question.answer?.content ?? '');
      setIsChecked(question.isChecked);
    }
  }, [question]);

  const isPending =
    editQuestionMutation.isPending || editAnswerMutation.isPending || verifyQAMutation.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question) return;

    const promises: Promise<unknown>[] = [];

    if (questionContent !== question.content) {
      promises.push(
        editQuestionMutation.mutateAsync({ id: question.id, content: questionContent }),
      );
    }

    if (question.answer && answerContent !== question.answer.content) {
      promises.push(
        editAnswerMutation.mutateAsync({ id: question.answer.id, content: answerContent }),
      );
    }

    if (isChecked !== question.isChecked) {
      promises.push(verifyQAMutation.mutateAsync({ questionId: question.id }));
    }

    if (promises.length > 0) {
      await Promise.all(promises);
    }

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle>질문 수정</DialogTitle>
          <DialogDescription>질문과 답변을 수정할 수 있습니다.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex gap-4">
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">전형 선택</span>
              <Selector value={ADMISSIONS[selectedType]}>
                <Selector.Trigger placeholder="전형 선택" />
                <Selector.Menus>
                  {Object.entries(ADMISSIONS).map(([value, label]) => (
                    <Selector.Menu
                      key={value}
                      value={value}
                      label={label}
                      onClick={(value) => setSelectedType(value as AdmissionType)}
                    />
                  ))}
                </Selector.Menus>
              </Selector>
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <span className="text-sm font-medium text-gray-700">카테고리 선택</span>
              <Selector value={ADMISSIONS_CATEGORIES[selectedCategory]}>
                <Selector.Trigger placeholder="카테고리 선택" />
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
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">질문 내용</span>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-maru focus:outline-none"
              rows={4}
              placeholder="질문을 입력해주세요"
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">답변 내용</span>
            <textarea
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-primary-maru focus:outline-none"
              rows={4}
              placeholder="답변을 입력해주세요"
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">확인 여부</span>
            <Switch checked={isChecked} onCheckedChange={setIsChecked} />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              variant="primary"
              size="large"
              disabled={!questionContent.trim() || isPending}
            >
              {isPending ? '처리 중...' : '수정하기'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default QuestionEditDialog;
