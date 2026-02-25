import { getAdmissionsStatus } from '@/api/swagger/admission';
import { useAdmissionStatusChangeMutation } from '@/app/(dashboard)/admission-active/hooks/use-admission-status-change-mutation';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ADMISSIONS, AdmissionType } from '@/types/admission';
import { useQuery } from '@tanstack/react-query';
import { Info } from 'lucide-react';

interface AdmissionActiveSwitchProps {
  selectedAdmissionType: AdmissionType;
}

function AdmissionActiveSwitch({ selectedAdmissionType }: AdmissionActiveSwitchProps) {
  const { data } = useQuery({
    queryKey: ['admissionsStatus'],
    queryFn: getAdmissionsStatus,
  });

  const { mutate } = useAdmissionStatusChangeMutation();

  const admissionStatus = data?.reduce(
    (acc, { type, isActivated }) => ({ ...acc, [type]: isActivated }),
    {} as Record<AdmissionType, boolean>,
  );

  const isCurrentlyActive = admissionStatus?.[selectedAdmissionType];

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={`${selectedAdmissionType}-active`}
        checked={admissionStatus?.[selectedAdmissionType]}
        onClick={() => {
          mutate(selectedAdmissionType);
        }}
      />
      <label htmlFor={`${selectedAdmissionType}-active`}>
        {ADMISSIONS[selectedAdmissionType]} {isCurrentlyActive ? '활성화 중' : '비활성화 중'}
      </label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger type="button">
            <Info className="h-4 w-4 text-gray-600" />
          </TooltipTrigger>
          <TooltipContent className="max-w-60">
            <p>활성화하면 챗봇이 해당 전형에 대한 질문에 답변할 수 있어요.</p>
            <p className="mt-1 text-gray-300">비활성화 시 해당 전형 관련 질문에 응답하지 않아요.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default AdmissionActiveSwitch;
