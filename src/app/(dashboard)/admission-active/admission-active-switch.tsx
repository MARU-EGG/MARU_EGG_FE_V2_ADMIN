import { getAdmissionsStatus } from '@/api/swagger/admission';
import { useAdmissionStatusChangeMutation } from '@/app/(dashboard)/admission-active/hooks/use-admission-status-change-mutation';
import { toast } from '@/components/toast';
import { Switch } from '@/components/ui/switch';
import { ADMISSIONS, AdmissionType } from '@/types/admission';
import { useQuery, useQueryClient } from '@tanstack/react-query';

interface AdmissionActiveSwitchProps {
  selectedAdmissionType: AdmissionType;
}

function AdmissionActiveSwitch({ selectedAdmissionType }: AdmissionActiveSwitchProps) {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['admissionsStatus'],
    queryFn: getAdmissionsStatus,
  });

  const admissionStatus = data?.reduce(
    (acc, { type, isActivated }) => ({ ...acc, [type]: isActivated }),
    {} as Record<AdmissionType, boolean>,
  );

  const { mutate } = useAdmissionStatusChangeMutation();

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={`${selectedAdmissionType}-active`}
        checked={admissionStatus?.[selectedAdmissionType]}
        onClick={() => {
          mutate(selectedAdmissionType, {
            onSuccess: () => {
              toast.open({
                type: 'success',
                position: 'top-center',
                message: `${selectedAdmissionType}이 활성화되었어요`,
              });
              queryClient.refetchQueries({ queryKey: ['admissionsStatus'] });
            },
            onError: () => {
              toast.open({
                type: 'error',
                position: 'top-center',
                message: `${selectedAdmissionType}이 활성화에 실패했어요`,
              });
            },
          });
        }}
      />
      <label htmlFor={`${selectedAdmissionType}-active`}>{ADMISSIONS[selectedAdmissionType]} 활성화</label>
    </div>
  );
}

export default AdmissionActiveSwitch;
