'use client';

import { PlusSquareIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { swapApplicantsListColumns } from '@/components/DataTable/columns/swap-applicants.columns';
import DataTable from '@/components/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { useGetRequestedSwaps } from '@/tanstack/swaps.query';

const SwapsRequestsTable = () => {
  const {
    data: { result: swaps },
  } = useGetRequestedSwaps();
  return (
    <section className="flex size-full flex-col items-center">
      <Link
        type="button"
        href="details/create"
        className="flex w-full items-center justify-center md:w-1/3"
      >
        <Button className="flex w-full items-center justify-center gap-2">
          <PlusSquareIcon />
          <span>Create New Swap</span>
        </Button>
      </Link>
      <DataTable
        columns={swapApplicantsListColumns}
        data={swaps.data}
        filter="status"
      />
    </section>
  );
};

export default SwapsRequestsTable;
