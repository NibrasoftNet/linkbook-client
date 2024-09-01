import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  deleteHistoryAction,
  getSearchServiceAction,
  getUsersHistory,
} from '@/actions/search.actions';
import type { SearchFormValues } from '@/components/map/SearchProduct';

export function useGetHistories() {
  return useSuspenseQuery({
    queryFn: async () => getUsersHistory(),
    queryKey: ['histories'],
  });
}

export function useSearchServiceQuery(data: SearchFormValues) {
  return useQuery({
    queryFn: async () => getSearchServiceAction(data),
    queryKey: ['search-products'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
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
