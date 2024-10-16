'use client';

import React from 'react';

import { swapApplicantsWithReplyListColumns } from '@/components/DataTable/columns/swap-applicants-with-reply.columns';
import SwapApplicantsDataTable from '@/components/DataTable/SwapApplicantsDataTable';
import type { ApplicantToSwapType } from '@/types/swap.type';

const SwapApplicantsTable = ({
  data,
}: {
  data: Array<ApplicantToSwapType>;
}) => {
  return (
    <section className="flex size-full flex-col">
      <h1 className="text-3xl font-bold">Swaps Applicants</h1>
      <SwapApplicantsDataTable
        columns={swapApplicantsWithReplyListColumns}
        data={data}
        filter="status"
      />
    </section>
  );
};

export default SwapApplicantsTable;
