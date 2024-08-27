import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import {
  createDonationAction,
  getDonationsList,
  getSingleDonationAction,
  updateDonationAction,
} from '@/actions/donations.actions';

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

export function useGetSingleDonationQuery(id: number) {
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
