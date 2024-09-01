/* eslint-disable no-nested-ternary */

'use server';

import type { User } from '@/app/[locale]/users/_components/columns';

// Mock data - replace this with your actual data fetching logic
const users: User[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? 'Admin' : 'User',
  status: i % 3 === 0 ? 'Inactive' : 'Active',
  priority: i % 3 === 0 ? 'Low' : i % 3 === 1 ? 'Medium' : 'High',
}));

export async function getUsers({
  page,
  search,
  sortBy,
  sortOrder,
  roleFilter,
  statusFilter,
  priorityFilter,
}: {
  page: number;
  search: string;
  sortBy: keyof User;
  sortOrder: 'asc' | 'desc';
  roleFilter: string;
  statusFilter: string;
  priorityFilter: string;
}) {
  const pageSize = 10;

  let filteredUsers = users;

  // Apply search
  if (search) {
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // Apply filters
  if (roleFilter !== 'all') {
    filteredUsers = filteredUsers.filter((user) => user.role === roleFilter);
  }
  if (statusFilter !== 'all') {
    filteredUsers = filteredUsers.filter(
      (user) => user.status === statusFilter,
    );
  }
  if (priorityFilter !== 'all') {
    filteredUsers = filteredUsers.filter(
      (user) => user.priority === priorityFilter,
    );
  }

  // Apply sorting
  filteredUsers.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return {
    users: paginatedUsers,
    totalPages,
  };
}
