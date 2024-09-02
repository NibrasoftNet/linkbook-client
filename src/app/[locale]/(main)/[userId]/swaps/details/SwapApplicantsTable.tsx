'use client';

import React from 'react';

import { swapApplicantsWithReplyListColumns } from '@/components/DataTable/columns/swap-applicants-with-reply.columns';
import SwapApplicantsDataTable from '@/components/DataTable/SwapApplicantsDataTable';
import type { ApplicantToSwapType } from '@/types/swap.type';

const SwapApplicantsTable = (applicants: { data: ApplicantToSwapType[] }) => {
  return (
    <section className="flex size-full flex-col">
      <h1 className="text-3xl font-bold">Swaps Applicants</h1>
      <SwapApplicantsDataTable
        columns={swapApplicantsWithReplyListColumns}
        data={applicants.data}
        filter="email"
      />
    </section>
  );
};

export default SwapApplicantsTable;
