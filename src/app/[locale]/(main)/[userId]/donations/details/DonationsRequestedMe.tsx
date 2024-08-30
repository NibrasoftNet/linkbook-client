'use client';

import { PlusSquareIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { donationApplicantsListColumns } from '@/components/DataTable/columns/donation-applicants.columns';
import DataTable from '@/components/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { useGetRequestedDonations } from '@/tanstack/donations.query';

const DonationsRequestsTable = () => {
  const {
    data: { result: donations },
  } = useGetRequestedDonations();
  return (
    <section className="flex size-full flex-col items-center">
      <Link
        type="button"
        href="donations/create"
        className="flex w-full items-center justify-center md:w-1/3"
      >
        <Button className="flex w-full items-center justify-center gap-2">
          <PlusSquareIcon />
          <span>Create New Donation</span>
        </Button>
      </Link>
      <DataTable
        columns={donationApplicantsListColumns}
        data={donations.data}
        filter="description"
      />
    </section>
  );
};

export default DonationsRequestsTable;
