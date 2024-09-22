import React from 'react';

import CommunityForm from '@/components/forms/CommunityForm';
import { CrudOperationsEnum } from '@/types/types';
import type { CommunitySchemaFormType } from '@/validations/create-community-schema.validator';

const CreateNewCommunityPage = () => {
  const defaultValues: Partial<CommunitySchemaFormType> = {
    files: null,
  };
  return (
    <CommunityForm
      defaultValues={defaultValues}
      operation={CrudOperationsEnum.CREATE}
    />
  );
};

export default CreateNewCommunityPage;
