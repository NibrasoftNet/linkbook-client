import { NextResponse } from 'next/server';

import { getUsers } from '@/actions/get-users.action';
import type { User } from '@/app/[locale]/users/_components/columns';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') ?? '1', 10);
  const search = searchParams.get('search') ?? '';
  const sortBy = (searchParams.get('sortBy') as keyof User) ?? 'id';
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') ?? 'asc';
  const roleFilter = searchParams.get('role') ?? 'all';
  const statusFilter = searchParams.get('status') ?? 'all';
  const priorityFilter = searchParams.get('priority') ?? 'all';

  const { users, totalPages } = await getUsers({
    page,
    search,
    sortBy,
    sortOrder,
    roleFilter,
    statusFilter,
    priorityFilter,
  });

  return NextResponse.json({ users, totalPages });
}
