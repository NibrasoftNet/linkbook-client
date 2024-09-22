import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import {
  getCommunityListMePrivateUnsubscribed,
  getRequestedCommunityList,
} from '@/actions/community.actions';
import PrivateCommunitiesUnsubscribedTable from '@/app/[locale]/(main)/[userId]/community/details/PrivateCommunitiesUnsubscribedTable';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { PaginationProps } from '@/types/types';

import CommunitiesRequestedMe from './CommunitiesRequestedMe';
import MyCommunitiesTable from './MyCommunitiesTable';

export default async function CommunityPage({
  searchParams,
}: {
  searchParams: PaginationProps;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['communities-me-list-private-unsubscribed', searchParams.page],
    queryFn: () => getCommunityListMePrivateUnsubscribed(searchParams),
  });
  await queryClient.prefetchQuery({
    queryKey: ['communities-requested-me-list'],
    queryFn: () => getRequestedCommunityList(),
  });
  const t = await getTranslations('CommunityTab');
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <div className="mx-auto w-full">
          <Tabs defaultValue="my_private-unsub_communities">
            <TabsList className="flex">
              <TabsTrigger
                value="my_private-unsub_communities"
                className="w-1/3"
              >
                {t('private_request_communities')}
              </TabsTrigger>
              <TabsTrigger value="my_communities" className="w-1/3">
                {t('my_communities')}
              </TabsTrigger>
              <TabsTrigger value="my_donations_request" className="w-1/3">
                {t('my_communities_request')}
              </TabsTrigger>
            </TabsList>
            <TabsContent
              id="#my_private-unsub_communities"
              value="my_private-unsub_communities"
            >
              <PrivateCommunitiesUnsubscribedTable
                searchParams={searchParams}
              />
            </TabsContent>
            <TabsContent id="#my_communities" value="my_communities">
              <MyCommunitiesTable />
            </TabsContent>
            <TabsContent
              id="#my_donations_request"
              value="my_donations_request"
            >
              <CommunitiesRequestedMe />
            </TabsContent>
          </Tabs>
        </div>
      </React.Suspense>
    </HydrationBoundary>
  );
}
