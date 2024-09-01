import { redirect } from 'next/navigation';
import React from 'react';

import ApplyToSwapForm from '@/components/forms/ApplyToSwapForm';
import { CrudOperationsEnum } from '@/types/types';
import type { ApplyToSwapSchemaFormType } from '@/validations/apply-to-swap-schema.validator';

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const swapId = searchParams.id;
  if (!swapId) {
    redirect('swaps/create');
  }
  const defaultValues: Partial<ApplyToSwapSchemaFormType> = {
    files: null,
  };
  return (
    <ApplyToSwapForm
      defaultValues={defaultValues}
      operation={CrudOperationsEnum.CREATE}
      swapId={Number(swapId)}
    />
  );
};

export default Page;
