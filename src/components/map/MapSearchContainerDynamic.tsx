'use client';

import dynamic from 'next/dynamic';

export const MapSearchContainerDynamic = dynamic(
  () => import('./MapSearchContainer'),
  {
    ssr: false,
  },
);
