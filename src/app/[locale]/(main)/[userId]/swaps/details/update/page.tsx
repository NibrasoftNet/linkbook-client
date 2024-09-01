import { redirect } from 'next/navigation';
import React from 'react';

import { getSingleSwapAction } from '@/actions/swaps.actions';
import SwapForm from '@/components/forms/SwapForm';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { Separator } from '@/components/ui/separator';
import type { SwapProps } from '@/types/swap.type';
import type { ApiResponse } from '@/types/types';
import { CrudOperationsEnum } from '@/types/types';
import type { DonationSchemaFormType } from '@/validations/create-donation-schema.validator';

import SwapApplicantsTable from '../SwapApplicantsTable';

const UpdateDonationPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const swapId = searchParams.id;
  if (!swapId) {
    redirect('swaps/create');
  }
  const swap: ApiResponse<SwapProps> = await getSingleSwapAction(
    String(swapId),
  );
  const defaultValues: Partial<DonationSchemaFormType> = {
    files: [] as File[],
    description: swap?.result.description,
    quantity: swap?.result.quantity,
    product: swap?.result.product,
    address: swap?.result.address,
  };
  return (
    <React.Suspense fallback={<TableSkeleton />}>
      <main
        className={`flex size-full flex-col p-4 ${!swap?.result.active && 'pointer-events-none cursor-not-allowed'}`}
      >
        <SwapApplicantsTable data={swap.result.applicants} />
        <Separator />
        <SwapForm
          defaultValues={defaultValues}
          operation={CrudOperationsEnum.UPDATE}
          swapId={Number(swapId)}
        />
      </main>
    </React.Suspense>
  );
};

export default UpdateDonationPage;
