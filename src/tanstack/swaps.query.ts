import { useMutation, useQuery, useSuspenseQuery } from '@tanstack/react-query';

import {
  acceptRequestSwapAction,
  applyRequestSwapAction,
  cancelRequestSwapAction,
  createSwapAction,
  getOthersSwapsList,
  getRequestedSwapsList,
  getSingleSwapAction,
  getSingleSwapByProductIdAction,
  getSwapsList,
  rejectRequestSwapAction,
  updateSwapAction,
} from '@/actions/swaps.actions';
import type { PaginationProps } from '@/types/types';

export function useGetSwaps() {
  return useSuspenseQuery({
    queryFn: async () => getSwapsList(),
    queryKey: ['swaps-list'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetRequestedSwaps() {
  return useSuspenseQuery({
    queryFn: async () => getRequestedSwapsList(),
    queryKey: ['swaps-requested-list'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetOthersSwaps(paginationParams: PaginationProps) {
  return useQuery({
    queryFn: async () => getOthersSwapsList(paginationParams),
    queryKey: ['swaps-others-list', paginationParams.page],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetSingleSwapQuery(id: string) {
  return useSuspenseQuery({
    queryFn: async () => getSingleSwapAction(id),
    queryKey: ['get-single-swap'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export const useCreateSwapMutation = () => {
  const mutation = useMutation({
    mutationFn: async (swapData: FormData) => createSwapAction(swapData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export function useGetSingleSwapByProductIdQuery(id: string) {
  return useSuspenseQuery({
    queryFn: async () => getSingleSwapByProductIdAction(id),
    queryKey: ['get-single-swap-by-product-id'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export const useUpdateSwapMutation = () => {
  const mutation = useMutation({
    mutationFn: async (swapWithIdData: { id: number; formData: FormData }) =>
      updateSwapAction(swapWithIdData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useApplyRequestSwapMutation = () => {
  const mutation = useMutation({
    mutationFn: async (applySwapWithIdData: {
      id: number;
      formData: FormData;
    }) => applyRequestSwapAction(applySwapWithIdData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useAcceptRequestSwapMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => acceptRequestSwapAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useRejectRequestSwapMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => rejectRequestSwapAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useCancelRequestSwapMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => cancelRequestSwapAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
