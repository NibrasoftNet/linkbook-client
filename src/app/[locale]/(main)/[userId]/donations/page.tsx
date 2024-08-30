import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import React from 'react';

import { getSingleDonationAction } from '@/actions/donations.actions';
import DonationDetails from '@/components/details/DonationDetails';
import TableSkeleton from '@/components/skeleton/TableSkeleton';

const DonationDetailsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const donationId = searchParams.id;
  if (!donationId) {
    redirect('donations/create');
  }
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['get-single-donation'],
    queryFn: () => getSingleDonationAction(String(donationId)),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <DonationDetails id={String(donationId)} />
      </React.Suspense>
    </HydrationBoundary>
  );
};

export default DonationDetailsPage;
