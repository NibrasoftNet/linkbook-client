import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React from 'react';

import { getSingleDonationByProductIdAction } from '@/actions/donations.actions';
import DonationDetailsByProduct from '@/components/details/DonationDetailsByProduct';
import TableSkeleton from '@/components/skeleton/TableSkeleton';

const DonationDetailsByProductPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const productId = searchParams.id;
  if (!productId) {
    redirect('donations/create');
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['get-single-donation-by-product-id'],
    queryFn: () => getSingleDonationByProductIdAction(String(productId)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <DonationDetailsByProduct id={String(productId)} />
      </React.Suspense>
    </HydrationBoundary>
  );
};

export default DonationDetailsByProductPage;
