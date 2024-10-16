import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import { getMyCommunityList } from '@/actions/community.actions';
import {
  getDonationsList,
  getOthersDonationsList,
  getRequestedDonationsList,
} from '@/actions/donations.actions';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { PaginationProps } from '@/types/types';

import DonationsRequestedMe from './DonationsRequestedMe';
import DonationsTable from './DonationsTable';
import OthersDonations from './OthersDonations';

export default async function DonationsPage({
  searchParams,
}: {
  searchParams: PaginationProps;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['communities-private-me-list'],
    queryFn: () => getMyCommunityList(),
  });

  await queryClient.prefetchQuery({
    queryKey: ['donations-list'],
    queryFn: getDonationsList,
  });
  await queryClient.prefetchQuery({
    queryKey: ['donations-requested-list'],
    queryFn: getRequestedDonationsList,
  });
  await queryClient.prefetchQuery({
    queryKey: ['donations-others-list', searchParams.page],
    queryFn: () => getOthersDonationsList(searchParams),
  });
  const t = await getTranslations('DonationsTab');
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <div className="mx-auto w-full">
          <Tabs defaultValue="latest_donations">
            <TabsList className="flex">
              <TabsTrigger value="latest_donations" className="w-1/3">
                {t('latest_donations')}
              </TabsTrigger>
              <TabsTrigger value="my_donations" className="w-1/3">
                {t('my_donations')}
              </TabsTrigger>
              <TabsTrigger value="my_donations_request" className="w-1/3">
                {t('my_donations_request')}
              </TabsTrigger>
            </TabsList>
            <TabsContent id="#details" value="latest_donations">
              <OthersDonations searchParams={searchParams} />
            </TabsContent>
            <TabsContent id="#details" value="my_donations">
              <DonationsTable />
            </TabsContent>
            <TabsContent id="#security" value="my_donations_request">
              <DonationsRequestedMe />
            </TabsContent>
          </Tabs>
        </div>
      </React.Suspense>
    </HydrationBoundary>
  );
}
