import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

import { getAllCommunityList } from '@/actions/community.actions';
import CommunityFeedForm from '@/components/forms/CommunityFeedForm';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { CrudOperationsEnum } from '@/types/types';
import type { CommunityFeedSchemaFormType } from '@/validations/create-community-feed-schema.validator';

const CreateNewCommunityFeedPage = async () => {
  const defaultValues: Partial<CommunityFeedSchemaFormType> = {
    files: null,
  };
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['find-all-communities'],
    queryFn: () => getAllCommunityList(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <CommunityFeedForm
          defaultValues={defaultValues}
          operation={CrudOperationsEnum.CREATE}
        />
      </React.Suspense>
    </HydrationBoundary>
  );
};

export default CreateNewCommunityFeedPage;
