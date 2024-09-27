'use client';

import { PlusSquareIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { donationListColumns } from '@/components/DataTable/columns/donation-list.columns';
import DataTable from '@/components/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { useGetDonations } from '@/tanstack/donations.query';

const DonationsTable = () => {
  const {
    data: { result: donations },
  } = useGetDonations();
  return (
    <section className="flex size-full flex-col items-center">
      <Link
        type="button"
        href="details/create"
        className="flex w-full items-center justify-center md:w-1/3"
      >
        <Button className="flex w-full items-center justify-center gap-2">
          <PlusSquareIcon />
          <span>Create New Donation</span>
        </Button>
      </Link>
      <DataTable
        columns={donationListColumns}
        data={donations?.data ?? []}
        filter="description"
      />
    </section>
  );
};

export default DonationsTable;
