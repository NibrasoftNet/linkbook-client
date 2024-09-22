import {
  keepPreviousData,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import {
  acceptRequestCommunityAction,
  applyRequestCommunityAction,
  cancelRequestCommunityAction,
  createCommunityDataAction,
  getCommunityList,
  getCommunityListMePrivateUnsubscribed,
  getMyCommunityList,
  getRequestedCommunityList,
  getSingleCommunityAction,
  rejectRequestCommunityAction,
  updateCommunityAction,
} from '@/actions/community.actions';
import type { PaginationProps } from '@/types/types';

export function useGetCommunities() {
  return useSuspenseQuery({
    queryFn: async () => getCommunityList(),
    queryKey: ['communities-list'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetMyCommunities() {
  return useSuspenseQuery({
    queryFn: async () => getMyCommunityList(),
    queryKey: ['communities-me-list'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetRequestedCommunities() {
  return useSuspenseQuery({
    queryFn: async () => getRequestedCommunityList(),
    queryKey: ['communities-requested-me-list'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetPrivateCommunitiesUnsubscribedQuery(
  paginationParams: PaginationProps,
) {
  return useQuery({
    queryFn: async () =>
      getCommunityListMePrivateUnsubscribed(paginationParams),
    queryKey: [
      'communities-me-list-private-unsubscribed',
      paginationParams.page,
    ],
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetSingleCommunityQuery(id: string) {
  return useSuspenseQuery({
    queryFn: async () => getSingleCommunityAction(id),
    queryKey: ['get-single-community'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export const useCreateCommunityMutation = () => {
  const mutation = useMutation({
    mutationFn: async (communityData: FormData) =>
      createCommunityDataAction(communityData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useUpdateCommunityMutation = () => {
  const mutation = useMutation({
    mutationFn: async (communityWithIdData: {
      id: number;
      formData: FormData;
    }) => updateCommunityAction(communityWithIdData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useApplyRequestCommunityMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => applyRequestCommunityAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useAcceptRequestCommunityMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => acceptRequestCommunityAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useRejectRequestCommunityMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => rejectRequestCommunityAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useCancelRequestCommunityMutation = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => cancelRequestCommunityAction(id),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
