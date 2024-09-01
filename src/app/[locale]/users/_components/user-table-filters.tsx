'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function UserTableFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('search', value);
    newParams.set('page', '1');
    router.push(`?${newParams.toString()}`);
  };

  const handleFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set(key, value);
    newParams.set('page', '1');
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="mb-4 flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <Input
        placeholder="Search users..."
        value={searchParams?.get('search') ?? ''}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-sm"
      />
      <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
        <Select
          value={searchParams?.get('role') ?? 'all'}
          onValueChange={(value) => handleFilter('role', value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="Admin">Admin</SelectItem>
            <SelectItem value="User">User</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={searchParams?.get('status') ?? 'all'}
          onValueChange={(value) => handleFilter('status', value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={searchParams?.get('priority') ?? 'all'}
          onValueChange={(value) => handleFilter('priority', value)}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="High">High</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
