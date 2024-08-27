import React from 'react';

import { MapSearchContainerDynamic } from '@/components/map/MapSearchContainerDynamic';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const SearchPage = () => {
  return (
    <section className="size-full min-h-svh">
      <ResizablePanelGroup direction="horizontal" className="h-full min-h-svh">
        <ResizablePanel defaultSize={25}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Sidebar</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <MapSearchContainerDynamic />
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  );
};

export default SearchPage;
