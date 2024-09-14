import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import {
  getOthersSwapsList,
  getRequestedSwapsList,
  getSwapsList,
} from '@/actions/swaps.actions';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { PaginationProps } from '@/types/types';

import OthersSwaps from './OthersSwaps';
import SwapsRequestedMe from './SwapsRequestedMe';
import SwapsTable from './SwapsTable';

export default async function DonationsPage({
  searchParams,
}: {
  searchParams: PaginationProps;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['swaps-list'],
    queryFn: getSwapsList,
  });
  await queryClient.prefetchQuery({
    queryKey: ['swaps-requested-list'],
    queryFn: getRequestedSwapsList,
  });
  await queryClient.prefetchQuery({
    queryKey: ['swaps-others-list', searchParams.page],
    queryFn: () => getOthersSwapsList(searchParams),
  });
  const t = await getTranslations('SwapsTab');
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <div className="mx-auto w-full">
          <Tabs defaultValue="latest_swaps">
            <TabsList className="flex">
              <TabsTrigger value="latest_swaps" className="w-1/3">
                {t('latest_swaps')}
              </TabsTrigger>
              <TabsTrigger value="my_swaps" className="w-1/3">
                {t('my_swaps')}
              </TabsTrigger>
              <TabsTrigger value="my_swaps_request" className="w-1/3">
                {t('my_swaps_request')}
              </TabsTrigger>
            </TabsList>
            <TabsContent id="#details" value="latest_swaps">
              <OthersSwaps searchParams={searchParams} />
            </TabsContent>
            <TabsContent id="#details" value="my_swaps">
              <SwapsTable />
            </TabsContent>
            <TabsContent id="#security" value="my_swaps_request">
              <SwapsRequestedMe />
            </TabsContent>
          </Tabs>
        </div>
      </React.Suspense>
    </HydrationBoundary>
  );
}
