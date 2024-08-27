import type { ColumnDef, Row } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ApplicantToDonationValueType } from '@/types/applicant-to-donation.type';

const handleEditUserRole = async (row: Row<ApplicantToDonationValueType>) => {
  const toastId = toast('Begins...');
  toast.loading('Loading...', {
    description: 'Start Operation...',
    id: toastId,
  });
  try {
    row.getValue('product');
    toast.success('Success', {
      description: 'Operation Successful',
      id: toastId,
    });
  } catch (e) {
    toast.error('Error', {
      description: `${e}`,
    });
    toast.dismiss(toastId);
  }
};

export const donationApplicantsListColumns: ColumnDef<ApplicantToDonationValueType>[] =
  [
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
        <div className="capitalize">DON-{String(row.getValue('id'))}</div>
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
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div className="lowercase">{String(row.getValue('status'))}</div>
      ),
    },
    {
      accessorKey: 'applicant.firstName',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="w-full text-center capitalize"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Email
            <ArrowUpDown className="ml-2 size-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center capitalize">
          {row.original.applicant.email}
        </div>
      ),
    },
    {
      accessorKey: 'applicant.address.city',
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
        <div className="capitalize">{row.original.applicant.address.city}</div>
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
              <DropdownMenuItem onClick={() => handleEditUserRole(row)}>
                Details
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
