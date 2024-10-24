import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { CommunityValueType } from '@/types/community.type';

export const communityListColumns: ColumnDef<CommunityValueType>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'Ref',
    cell: ({ row }) => (
      <Link type="button" href={`../community?id=${row.original.id}`}>
        COM-{String(row.getValue('id'))}
      </Link>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }) => (
      <div className="capitalize">
        {dayjs(row.getValue('createdAt')).format('DD-MMM-YYYY')}
      </div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className="capitalize">{String(row.getValue('name'))}</div>
    ),
  },
  {
    accessorKey: 'bio',
    header: 'Bio',
    cell: ({ row }) => <div className="lowercase">{row.getValue('bio')}</div>,
  },
  {
    accessorKey: 'isPrivate',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Private
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{String(row.getValue('isPrivate'))}</div>
    ),
  },
  {
    accessorKey: 'invitationCode',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full text-center capitalize"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Invitation Code
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {row.original.invitationCode}
      </div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`details/update?id=${row.original.id}`}>Details</Link>
            </DropdownMenuItem>
            {/*            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleEditUserStatus(row)}>
              Edit
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
