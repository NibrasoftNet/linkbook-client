import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getTranslations } from 'next-intl/server';
import React from 'react';

import {
  getCommunityFeedListMeAction,
  getCommunityFeedListRelatedMeAction,
} from '@/actions/community-feed.actions';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { PaginationProps } from '@/types/types';

import CommunitiesFeedMe from './CommunitiesFeedMe';
import CommunitiesFeedRelatedMe from './CommunitiesFeedRelatedMe';

export default async function CommunityFeedPage({
  searchParams,
}: {
  searchParams: PaginationProps;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['community-list-feed-related-me', searchParams.page],
    queryFn: () => getCommunityFeedListRelatedMeAction(searchParams),
  });

  await queryClient.prefetchQuery({
    queryKey: ['community-list-feed-me', searchParams.page],
    queryFn: () => getCommunityFeedListMeAction(searchParams),
  });

  const t = await getTranslations('CommunityTab');
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <React.Suspense fallback={<TableSkeleton />}>
        <div className="mx-auto w-full">
          <Tabs defaultValue="feed_related_me">
            <TabsList className="flex">
              <TabsTrigger value="feed_related_me" className="w-1/2">
                {t('private_request_communities')}
              </TabsTrigger>
              <TabsTrigger value="feed_mine" className="w-1/2">
                {t('my_communities')}
              </TabsTrigger>
            </TabsList>
            <TabsContent id="#feed_related_me" value="feed_related_me">
              <CommunitiesFeedRelatedMe searchParams={searchParams} />
            </TabsContent>
            <TabsContent id="#feed_mine" value="feed_mine">
              <CommunitiesFeedMe searchParams={searchParams} />
            </TabsContent>
          </Tabs>
        </div>
      </React.Suspense>
    </HydrationBoundary>
  );
}
