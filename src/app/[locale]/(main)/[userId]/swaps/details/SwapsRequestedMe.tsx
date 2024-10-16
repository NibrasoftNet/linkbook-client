'use client';

import React from 'react';

import { swapApplicantsListColumns } from '@/components/DataTable/columns/swap-applicants.columns';
import DataTable from '@/components/DataTable/DataTable';
import { useGetRequestedSwaps } from '@/tanstack/swaps.query';

const SwapsRequestsTable = () => {
  const {
    data: { result: swaps },
  } = useGetRequestedSwaps();
  return (
    <section className="flex size-full flex-col items-center">
      <DataTable
        columns={swapApplicantsListColumns}
        data={swaps?.data ?? []}
        filter="status"
      />
    </section>
  );
};

export default SwapsRequestsTable;
