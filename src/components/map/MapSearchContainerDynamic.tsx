'use client';

import dynamic from 'next/dynamic';

import TableSkeleton from '@/components/skeleton/TableSkeleton';

export const MapSearchContainerDynamic = dynamic(
  () => import('./MapSearchContainer'),
  {
    loading: () => <TableSkeleton />,
    ssr: false,
  },
);
