import { signIn } from '@/api/swagger/auth';
import { useMutation } from '@tanstack/react-query';

export function useLoginMutation() {
  const mutate = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => signIn({ email, password }),
  });

  return mutate;
}
