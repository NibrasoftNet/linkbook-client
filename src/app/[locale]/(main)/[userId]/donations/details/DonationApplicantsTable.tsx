'use client';

import React from 'react';

import { donationApplicantsListColumns } from '@/components/DataTable/columns/donation-applicants.columns';
import DataTable from '@/components/DataTable/DataTable';

const DonationApplicantsTable = (applicants: any) => {
  console.log('dfs', applicants);
  return (
    <section className="flex size-full flex-col">
      <h1 className="text-3xl font-bold">Donations Applicants</h1>
      <DataTable
        columns={donationApplicantsListColumns}
        data={applicants.data}
        filter="description"
      />
    </section>
  );
};

export default DonationApplicantsTable;
