import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React from 'react';

import { getMyNotificationsList } from '@/actions/notification.actions';
import NotificationsList from '@/app/[locale]/(main)/[userId]/notifications/NotificationsList';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import type { PaginationProps } from '@/types/types';

export default async function NotificationPage({
  searchParams,
}: {
  searchParams: PaginationProps;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['my-notifications', searchParams.page],
    queryFn: () => getMyNotificationsList(searchParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <NotificationsList searchParams={searchParams} />
      </React.Suspense>
    </HydrationBoundary>
  );
}
