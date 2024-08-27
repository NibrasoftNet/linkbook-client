import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import type * as z from 'zod';

import { updateProfileAction } from '@/actions/auth.actions';
import { getUsersList } from '@/actions/users.actions';
import type { userUpdateProfileFormSchema } from '@/validations/user-update-profile-schema.validator';

export function useGetUsers() {
  return useSuspenseQuery({
    queryFn: async () => getUsersList(),
    queryKey: ['users'],
  });
}

export const useUpdateProfileMutation = () => {
  const mutation = useMutation({
    mutationFn: async (
      profileData: z.infer<typeof userUpdateProfileFormSchema>,
    ) => updateProfileAction(profileData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
