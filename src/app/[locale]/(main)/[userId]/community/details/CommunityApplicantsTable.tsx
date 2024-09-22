'use client';

import React from 'react';

import { communityApplicantsWithReplyListColumns } from '@/components/DataTable/columns/community-applicants-with-reply.columns';
import DataTable from '@/components/DataTable/DataTable';
import type { ApplicantToCommunityValueType } from '@/types/applicant-to-community.type';

const CommunityApplicantsTable = ({
  data,
}: {
  data: Array<ApplicantToCommunityValueType>;
}) => {
  return (
    <section className="flex size-full flex-col">
      <h1 className="text-3xl font-bold">Community Applicants</h1>
      <DataTable
        columns={communityApplicantsWithReplyListColumns}
        data={data}
        filter="status"
      />
    </section>
  );
};

export default CommunityApplicantsTable;
