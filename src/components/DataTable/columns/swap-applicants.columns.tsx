import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import * as React from 'react';
import { ImCancelCircle } from 'react-icons/im';

import AlertDialogCustom from '@/components/alert-dialog/AlertDialogCustom';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DonationOperationEnum,
  DonationStatusEnum,
} from '@/types/donation.type';
import type { ApplicantToSwapType } from '@/types/swap.type';

export const swapApplicantsListColumns: ColumnDef<ApplicantToSwapType>[] = [
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
      <div className="max-w-16 truncate capitalize">
        SWA-{String(row.getValue('id'))}
      </div>
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
    accessorKey: 'donation.description',
    header: 'Description',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.swap.description}</div>
    ),
  },
  {
    accessorKey: 'swap.creator.firstName',
    header: 'Name',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.swap.creator.firstName}</div>
    ),
  },
  {
    accessorKey: 'swap.creator.phone',
    header: 'Phone',
    cell: ({ row }) => (
      <div className="lowercase">{row.original.swap.creator.phone}</div>
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
    id: 'actions',
    enableHiding: true,
    cell: ({ row }) => {
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className={`${row.original.status !== DonationStatusEnum.PENDING && 'hidden'} w-full gap-2 bg-red-400`}
            >
              <ImCancelCircle />
              <span className="capitalize">cancel</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogCustom
            title="Are you sure?"
            description="Are you sure you want to cancell your request."
            method={DonationOperationEnum.CANCEL}
            operation="Ask for cancellation"
            param={row.original.id}
          />
        </AlertDialog>
      );
    },
  },
];
