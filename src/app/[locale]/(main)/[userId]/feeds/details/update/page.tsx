import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React from 'react';

import { getAllCommunityList } from '@/actions/community.actions';
import { getSingleCommunityFeedAction } from '@/actions/community-feed.actions';
import CommunityFeedForm from '@/components/forms/CommunityFeedForm';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import type { CommunityFeedValueType } from '@/types/community-feed.type';
import type { ApiResponse } from '@/types/types';
import { CrudOperationsEnum } from '@/types/types';
import type { CommunityFeedSchemaFormType } from '@/validations/create-community-feed-schema.validator';

const UpdateCommunityPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const communityFeedId = searchParams.id;
  if (!communityFeedId) {
    redirect('feeds/create');
  }
  const communityFeed: ApiResponse<CommunityFeedValueType> =
    await getSingleCommunityFeedAction(String(communityFeedId));
  const defaultValues: Partial<CommunityFeedSchemaFormType> = {
    files: [] as File[],
    title: communityFeed?.result.title,
    url: communityFeed?.result.url,
    description: communityFeed?.result.description,
    communityId: communityFeed?.result.community.id,
  };

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['find-all-communities'],
    queryFn: () => getAllCommunityList(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <main className="flex size-full flex-col p-4">
          <CommunityFeedForm
            defaultValues={defaultValues}
            operation={CrudOperationsEnum.UPDATE}
            communityFeedId={Number(communityFeedId)}
          />
        </main>
      </React.Suspense>
    </HydrationBoundary>
  );
};

export default UpdateCommunityPage;
