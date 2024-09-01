import React from 'react';

import SwapForm from '@/components/forms/SwapForm';
import { CrudOperationsEnum } from '@/types/types';
import type { SwapSchemaFormType } from '@/validations/create-swap-schema.validator';

const CreateNewDonationPage = () => {
  const defaultValues: Partial<SwapSchemaFormType> = {
    files: null,
  };
  return (
    <SwapForm
      defaultValues={defaultValues}
      operation={CrudOperationsEnum.CREATE}
    />
  );
};

export default CreateNewDonationPage;
