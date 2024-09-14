import {
  keepPreviousData,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import {
  acceptRequestDonationAction,
  applyRequestDonationAction,
  cancelRequestDonationAction,
  createDonationAction,
  getDonationsList,
  getOthersDonationsList,
  getRequestedDonationsList,
  getSingleDonationAction,
  getSingleDonationByProductIdAction,
  rejectRequestDonationAction,
  updateDonationAction,
} from '@/actions/donations.actions';
import type { PaginationProps } from '@/types/types';

export function useGetDonations() {
  return useSuspenseQuery({
    queryFn: async () => getDonationsList(),
    queryKey: ['donations-list'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetRequestedDonations() {
  return useSuspenseQuery({
    queryFn: async () => getRequestedDonationsList(),
    queryKey: ['donations-requested-list'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetOthersDonations(paginationParams: PaginationProps) {
  return useQuery({
    queryFn: async () => getOthersDonationsList(paginationParams),
    queryKey: ['donations-others-list', paginationParams.page],
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetSingleDonationByProductIdQuery(id: string) {
  return useSuspenseQuery({
    queryFn: async () => getSingleDonationByProductIdAction(id),
    queryKey: ['get-single-donation-by-product-id'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetSingleDonationQuery(id: string) {
  return useSuspenseQuery({
    queryFn: async () => getSingleDonationAction(id),
    queryKey: ['get-single-donation'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export const useCreateDonationMutation = () => {
  const mutation = useMutation({
    mutationFn: async (donationData: FormData) =>
      createDonationAction(donationData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useUpdateDonationMutation = () => {
  const mutation = useMutation({
    mutationFn: async (donationWithIdData: {
      id: number;
      formData: FormData;
    }) => updateDonationAction(donationWithIdData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useApplyRequestDonationMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => applyRequestDonationAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useAcceptRequestDonationMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => acceptRequestDonationAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useRejectRequestDonationMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => rejectRequestDonationAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useCancelRequestDonationMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => cancelRequestDonationAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
