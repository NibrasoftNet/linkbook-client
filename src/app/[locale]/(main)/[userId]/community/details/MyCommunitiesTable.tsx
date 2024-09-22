'use client';

import { PlusSquareIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { communityListColumns } from '@/components/DataTable/columns/community-list.columns';
import DataTable from '@/components/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { useGetMyCommunities } from '@/tanstack/community.query';

const MyCommunitiesTable = () => {
  const {
    data: { result: communities },
  } = useGetMyCommunities();
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
        columns={communityListColumns}
        data={communities.data}
        filter="name"
      />
    </section>
  );
};

export default MyCommunitiesTable;
