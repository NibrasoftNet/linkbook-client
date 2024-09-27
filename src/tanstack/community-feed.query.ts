import {
  keepPreviousData,
  useMutation,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

import {
  createCommunityFeedAction,
  getCommunityFeedListAction,
  getCommunityFeedListMeAction,
  getCommunityFeedListRelatedMeAction,
  getSingleCommunityFeedAction,
  updateCommunityFeedAction,
} from '@/actions/community-feed.actions';
import type { PaginationProps } from '@/types/types';

export function useGetCommunityFeeds() {
  return useSuspenseQuery({
    queryFn: async () => getCommunityFeedListAction(),
    queryKey: ['communities-feed-list'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetMyCommunitiesFeedsRelatedMe(
  paginationParams: PaginationProps,
) {
  return useQuery({
    queryFn: async () => getCommunityFeedListRelatedMeAction(paginationParams),
    queryKey: ['community-list-feed-related-me', paginationParams.page],
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetMyCommunitiesFeedsMe(paginationParams: PaginationProps) {
  return useQuery({
    queryFn: async () => getCommunityFeedListMeAction(paginationParams),
    queryKey: ['community-list-feed-me', paginationParams.page],
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export function useGetSingleCommunityQuery(id: string) {
  return useSuspenseQuery({
    queryFn: async () => getSingleCommunityFeedAction(id),
    queryKey: ['get-single-community-feed'],
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchInterval: false,
  });
}

export const useCreateCommunityFeedMutation = () => {
  const mutation = useMutation({
    mutationFn: async (communityData: FormData) =>
      createCommunityFeedAction(communityData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};

export const useUpdateCommunityFeedMutation = () => {
  const mutation = useMutation({
    mutationFn: async (communityFeedWithIdData: {
      id: number;
      formData: FormData;
    }) => updateCommunityFeedAction(communityFeedWithIdData),
  });
  return {
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
};
