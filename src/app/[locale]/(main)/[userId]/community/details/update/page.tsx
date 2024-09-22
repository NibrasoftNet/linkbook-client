import { redirect } from 'next/navigation';
import React from 'react';

import { getSingleCommunityAction } from '@/actions/community.actions';
import CommunityForm from '@/components/forms/CommunityForm';
import TableSkeleton from '@/components/skeleton/TableSkeleton';
import { Separator } from '@/components/ui/separator';
import type { CommunityValueType } from '@/types/community.type';
import type { ApiResponse } from '@/types/types';
import { CrudOperationsEnum } from '@/types/types';
import type { CommunitySchemaFormType } from '@/validations/create-community-schema.validator';

import CommunityApplicantsTable from '../CommunityApplicantsTable';

const UpdateCommunityPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const communityId = searchParams.id;
  if (!communityId) {
    redirect('community/create');
  }
  const community: ApiResponse<CommunityValueType> =
    await getSingleCommunityAction(String(communityId));
  const defaultValues: Partial<CommunitySchemaFormType> = {
    files: [] as File[],
    name: community?.result.name,
    bio: community?.result.bio,
    isPrivate: community?.result.isPrivate,
  };
  return (
    <React.Suspense fallback={<TableSkeleton />}>
      <main className="flex size-full flex-col p-4">
        {community.result.isPrivate && community.result.subscribers && (
          <CommunityApplicantsTable data={community.result.subscribers} />
        )}
        <Separator />
        <CommunityForm
          defaultValues={defaultValues}
          operation={CrudOperationsEnum.UPDATE}
          communityId={Number(communityId)}
        />
      </main>
    </React.Suspense>
  );
};

export default UpdateCommunityPage;
