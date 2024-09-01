import React from 'react';

import { MapSearchContainerDynamic } from '@/components/map/MapSearchContainerDynamic';
import { SubscriptionStatusEnum } from '@/types/types';

const SearchUnsubscribed = () => {
  return (
    <MapSearchContainerDynamic
      search={false}
      searchMarkers
      subscriptionStatus={SubscriptionStatusEnum.UNSUBSCRIBED}
    />
  );
};

export default SearchUnsubscribed;
