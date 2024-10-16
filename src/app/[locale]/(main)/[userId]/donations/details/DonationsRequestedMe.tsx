'use client';

import React from 'react';

import { donationApplicantsListColumns } from '@/components/DataTable/columns/donation-applicants.columns';
import DataTable from '@/components/DataTable/DataTable';
import { useGetRequestedDonations } from '@/tanstack/donations.query';

const DonationsRequestsTable = () => {
  const {
    data: { result: donations },
  } = useGetRequestedDonations();
  return (
    <section className="flex size-full flex-col items-center">
      <DataTable
        columns={donationApplicantsListColumns}
        data={donations?.data ?? []}
        filter="status"
      />
    </section>
  );
};

export default DonationsRequestsTable;
