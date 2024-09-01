import React from 'react';

import SearchResultsList from '@/components/details/SearchResultsList';
import { MapSearchContainerDynamic } from '@/components/map/MapSearchContainerDynamic';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { SubscriptionStatusEnum } from '@/types/types';

const SearchPage = () => {
  return (
    <section className="size-full min-h-svh">
      <ResizablePanelGroup direction="horizontal" className="h-full min-h-svh">
        <ResizablePanel defaultSize={25}>
          <SearchResultsList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <MapSearchContainerDynamic
            search={false}
            searchMarkers
            subscriptionStatus={SubscriptionStatusEnum.SUBSCRIBED}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default SearchPage;
