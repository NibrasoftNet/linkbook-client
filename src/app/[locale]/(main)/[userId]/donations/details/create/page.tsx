import React from 'react';

import DonationForm from '@/components/forms/DonationForm';
import { CrudOperationsEnum } from '@/types/types';
import type { DonationSchemaFormType } from '@/validations/create-donation-schema.validator';

const CreateNewDonationPage = () => {
  const defaultValues: Partial<DonationSchemaFormType> = {
    files: null,
  };
  return (
    <DonationForm
      defaultValues={defaultValues}
      operation={CrudOperationsEnum.CREATE}
    />
  );
};

export default CreateNewDonationPage;
