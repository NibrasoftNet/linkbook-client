'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { User } from './columns';
import { columns } from './columns';
import { DataTable } from './data-table';
import { UserTableFilters } from './user-table-filters';

interface UserTableClientProps {
  initialUsers: User[];
  initialTotalPages: number;
}

export function UserTableClient({
  initialUsers,
  initialTotalPages,
}: UserTableClientProps) {
  const [users, setUsers] = useState(initialUsers);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const searchParamsObj = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/users?${searchParamsObj?.toString()}`);
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
    };

    fetchData();
  }, [searchParamsObj]);

  return (
    <>
      <UserTableFilters />
      <DataTable columns={columns} data={users} totalPages={totalPages} />
    </>
  );
}
