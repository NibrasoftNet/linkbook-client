import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React from 'react';

import { getSingleSwapByProductIdAction } from '@/actions/swaps.actions';
import SwapDetailsByProduct from '@/components/details/SwapDetailsByProduct';
import TableSkeleton from '@/components/skeleton/TableSkeleton';

const SwapDetailsByProductPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const productId = searchParams.id;
  if (!productId) {
    redirect('swaps/create');
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['get-single-swap-by-product-id'],
    queryFn: () => getSingleSwapByProductIdAction(String(productId)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <SwapDetailsByProduct id={String(productId)} />
      </React.Suspense>
    </HydrationBoundary>
  );
};

export default SwapDetailsByProductPage;
