'use client';

import React from 'react';

import { donationApplicantsWithReplyListColumns } from '@/components/DataTable/columns/donation-applicants-with-reply.columns';
import DataTable from '@/components/DataTable/DataTable';
import type { ApplicantToDonationValueType } from '@/types/applicant-to-donation.type';

const DonationApplicantsTable = ({
  data,
}: {
  data: Array<ApplicantToDonationValueType>;
}) => {
  return (
    <section className="flex size-full flex-col">
      <h1 className="text-3xl font-bold">Donations Applicants</h1>
      <DataTable
        columns={donationApplicantsWithReplyListColumns}
        data={data}
        filter="email"
      />
    </section>
  );
};

export default DonationApplicantsTable;
