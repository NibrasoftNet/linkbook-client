import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { updateProfileAction } from '@/actions/auth.actions';
import { getUsersList } from '@/actions/users.actions';

export function useGetUsers() {
  return useSuspenseQuery({
    queryFn: async () => getUsersList(),
    queryKey: ['users'],
  });
}

export const useUpdateProfileMutation = () => {
  const mutation = useMutation({
    mutationFn: async (userWithIdData: { id: number; formData: FormData }) =>
      updateProfileAction(userWithIdData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
