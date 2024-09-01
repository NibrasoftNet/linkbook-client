import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React from 'react';

import { getSingleSwapAction } from '@/actions/swaps.actions';
import SwapDetails from '@/components/details/SwapDetails';
import TableSkeleton from '@/components/skeleton/TableSkeleton';

const SwapsDetailsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const swapId = searchParams.id;
  if (!swapId) {
    redirect('swaps/create');
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['get-single-swap'],
    queryFn: () => getSingleSwapAction(String(swapId)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <SwapDetails id={String(swapId)} />
      </React.Suspense>
    </HydrationBoundary>
  );
};

export default SwapsDetailsPage;
