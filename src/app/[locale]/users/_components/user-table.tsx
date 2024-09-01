import { Suspense } from 'react';

import { getUsers } from '@/actions/get-users.action';

import type { User } from './columns';
import { UserTableClient } from './user-table-client';
import { UserTableSkeleton } from './user-table-skeleton';

export async function UserTable({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = parseInt((searchParams.page as string) ?? '1', 10);
  const search = (searchParams.search as string) ?? '';
  const sortBy = (searchParams.sortBy as keyof User) ?? 'id';
  const sortOrder = (searchParams.sortOrder as 'asc' | 'desc') ?? 'asc';
  const roleFilter = (searchParams.role as string) ?? 'all';
  const statusFilter = (searchParams.status as string) ?? 'all';
  const priorityFilter = (searchParams.priority as string) ?? 'all';

  const { users, totalPages } = await getUsers({
    page,
    search,
    sortBy,
    sortOrder,
    roleFilter,
    statusFilter,
    priorityFilter,
  });

  return (
    <Suspense fallback={<UserTableSkeleton />}>
      <UserTableClient initialUsers={users} initialTotalPages={totalPages} />
    </Suspense>
  );
}
