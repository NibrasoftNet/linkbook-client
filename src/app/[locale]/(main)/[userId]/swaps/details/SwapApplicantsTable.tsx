'use client';

import React from 'react';

import { swapApplicantsWithReplyListColumns } from '@/components/DataTable/columns/swap-applicants-with-reply.columns';
import DataTable from '@/components/DataTable/DataTable';

const SwapApplicantsTable = (applicants: any) => {
  return (
    <section className="flex size-full flex-col">
      <h1 className="text-3xl font-bold">Swaps Applicants</h1>
      <DataTable
        columns={swapApplicantsWithReplyListColumns}
        data={applicants.data}
        filter="email"
      />
    </section>
  );
};

export default SwapApplicantsTable;
