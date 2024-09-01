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
import type { SwapValueType } from '@/types/swap.type';

export const swapListColumns: ColumnDef<SwapValueType>[] = [
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
      <Link type="button" href={`../swaps?id=${row.original.id}`}>
        SWA-{String(row.getValue('id'))}
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
    accessorKey: 'active',
    header: 'Status',
    cell: ({ row }) => (
      <div className="capitalize">{String(row.getValue('active'))}</div>
    ),
  },
  {
    accessorKey: 'product.description',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full text-center capitalize"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Product
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {row.original.product.description}
      </div>
    ),
  },
  {
    accessorKey: 'description',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          description
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'address.city',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          City
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.address.city}</div>
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
