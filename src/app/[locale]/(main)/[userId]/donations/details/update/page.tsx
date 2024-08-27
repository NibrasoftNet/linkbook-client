import { redirect } from 'next/navigation';
import React from 'react';

import { getSingleDonationAction } from '@/actions/donations.actions';
import DonationForm from '@/components/forms/DonationForm';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { Separator } from '@/components/ui/separator';
import type { DonationProps } from '@/types/donation.type';
import type { ApiResponse } from '@/types/types';
import { CrudOperationsEnum } from '@/types/types';
import type { DonationSchemaFormType } from '@/validations/create-donation-schema.validator';

import DonationApplicantsTable from '../DonationApplicantsTable';

const UpdateDonationPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const donationId = searchParams.id;
  if (!donationId) {
    redirect('donations/create');
  }
  const donation: ApiResponse<DonationProps> = await getSingleDonationAction(
    Number(donationId),
  );
  const defaultValues: Partial<DonationSchemaFormType> = {
    files: [] as File[],
    description: donation?.result.description,
    quantity: donation?.result.quantity,
    product: donation?.result.product,
    address: donation?.result.address,
  };
  return (
    <React.Suspense fallback={<TableSkeleton />}>
      <main className="flex size-full flex-col p-4">
        <DonationApplicantsTable data={donation.result.applicants} />
        <Separator />
        <DonationForm
          defaultValues={defaultValues}
          operation={CrudOperationsEnum.UPDATE}
          donationId={Number(donationId)}
        />
      </main>
    </React.Suspense>
  );
};

export default UpdateDonationPage;
