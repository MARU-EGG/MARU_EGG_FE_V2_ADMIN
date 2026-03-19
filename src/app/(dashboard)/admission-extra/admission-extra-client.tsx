'use client';

import { ADMISSIONS, ADMISSIONS_CATEGORIES, AdmissionCategoryType, AdmissionType } from '@/types/admission';
import { useEffect, useState } from 'react';
import { getDefaultPrompt } from '@/app/(dashboard)/admission-extra/constants/default-prompts';
import usePromptQuery from '@/app/(dashboard)/admission-extra/hooks/use-prompt-query';
import useUpdatePromptMutation from '@/app/(dashboard)/admission-extra/hooks/use-update-prompt-mutation';
import Button from '@/components/button/button';
import Selector from '@/components/selector';

function AdmissionExtraClient() {
  const [selectedType, setSelectedType] = useState<AdmissionType>('SUSI');
  const [selectedCategory, setSelectedCategory] = useState<AdmissionCategoryType>('ADMISSION_GUIDELINE');
  const [promptText, setPromptText] = useState('');

  const typeLabel = ADMISSIONS[selectedType];
  const categoryLabel = ADMISSIONS_CATEGORIES[selectedCategory];

  const { data } = usePromptQuery({ type: typeLabel, category: categoryLabel });
  const { mutate: updatePrompt, isPending } = useUpdatePromptMutation();

  useEffect(() => {
    if (data?.prompt_text !== undefined) {
      setPromptText(data.prompt_text);
    }
  }, [data]);

  const handleReset = () => {
    setPromptText(getDefaultPrompt(typeLabel, categoryLabel));
  };

  const handleUpdate = () => {
    updatePrompt({
      question_type: typeLabel,
      question_category: categoryLabel,
      prompt_text: promptText,
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">전형</span>
        <Selector value={typeLabel}>
          <Selector.Trigger placeholder="" />
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

        <span className="text-sm font-medium">카테고리</span>
        <Selector value={categoryLabel}>
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
      </div>

      <hr className="border-gray-200" />

      <div className="flex flex-col gap-3">
        <p className="text-sm text-gray-600">모집요강에 있는 내용 외에 추가적인 정보를 입력해주시면 됩니다.</p>
        <textarea
          className="w-full resize-y rounded-lg border border-gray-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-egg"
          rows={20}
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <Button variant="secondary" size="large" onClick={handleReset}>
            초기화
          </Button>
          <Button variant="primary" size="large" onClick={handleUpdate} disabled={isPending}>
            프롬프트 수정
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AdmissionExtraClient;
