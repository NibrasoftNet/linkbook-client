import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

import {
  deleteHistoryAction,
  getPaginatedSearchAction,
  getUsersHistory,
} from '@/actions/search.actions';
import { Env } from '@/libs/Env';
import type { SearchServiceProps } from '@/types/search.type';
import type { ApiResponsePaginated } from '@/types/types';

export function useGetHistories() {
  return useSuspenseQuery({
    queryFn: async () => getUsersHistory(),
    queryKey: ['histories'],
  });
}

export const useSearchPaginationQuery = async (url: string) => {
  return useQuery({
    // @ts-ignore
    queryFn: async () => {
      const data: ApiResponsePaginated<SearchServiceProps> =
        await getPaginatedSearchAction(url);
      return data;
    },
    queryKey: ['search-products'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
};

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

export function useGetAllProductsQuery() {
  return useSuspenseQuery({
    queryFn: async () => {
      const { data } = await axios.get(
        `${Env.NEXT_PUBLIC_API_URL}/products/find/all-products`,
      );
      if (!data) return [];
      if (data) return data;
    },
    queryKey: ['all-products'],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
    retry: true,
  });
}
