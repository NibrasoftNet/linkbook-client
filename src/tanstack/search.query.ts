import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import { deleteHistoryAction, getUsersHistory } from '@/actions/search.actions';

export function useGetHistories() {
  return useSuspenseQuery({
    queryFn: async () => getUsersHistory(),
    queryKey: ['histories'],
  });
}

export const useDeleteHistoryMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: number) => deleteHistoryAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
