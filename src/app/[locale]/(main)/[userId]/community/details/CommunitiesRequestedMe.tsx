'use client';

import { PlusSquareIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { communityApplicantsListColumns } from '@/components/DataTable/columns/community-applicants.columns';
import DataTable from '@/components/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { useGetRequestedCommunities } from '@/tanstack/community.query';

const CommunitiesRequestedMeTable = () => {
  const {
    data: { result: communities },
  } = useGetRequestedCommunities();
  return (
    <section className="flex size-full flex-col items-center">
      <Link
        type="button"
        href="details/create"
        className="flex w-full items-center justify-center md:w-1/3"
      >
        <Button className="flex w-full items-center justify-center gap-2">
          <PlusSquareIcon />
          <span>Create New Community</span>
        </Button>
      </Link>
      <DataTable
        columns={communityApplicantsListColumns}
        data={communities?.data ?? []}
        filter="status"
      />
    </section>
  );
};

export default CommunitiesRequestedMeTable;
