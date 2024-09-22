import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import * as React from 'react';
import { ImCancelCircle } from 'react-icons/im';

import AlertDialogCommunity from '@/components/alert-dialog/AlertDialogCommunity';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { ApplicantToCommunityValueType } from '@/types/applicant-to-community.type';
import {
  PrivateCommunityOperationEnum,
  PrivateCommunityStatusEnum,
} from '@/types/community.type';

export const communityApplicantsListColumns: ColumnDef<ApplicantToCommunityValueType>[] =
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
        <div className="max-w-16 truncate capitalize">
          COM-{String(row.getValue('id'))}
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
      accessorKey: 'community.name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="lowercase">{row.original.community.name}</div>
      ),
    },
    {
      accessorKey: 'community.creator.firstName',
      header: 'Name',
      cell: ({ row }) => (
        <div className="lowercase">
          {row.original.community.creator.firstName}
        </div>
      ),
    },
    {
      accessorKey: 'community.creator.phone',
      header: 'Phone',
      cell: ({ row }) => (
        <div className="lowercase">{row.original.community.creator.phone}</div>
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
                className={`${row.original.status !== PrivateCommunityStatusEnum.PENDING && 'hidden'} w-full gap-2 bg-red-400`}
              >
                <ImCancelCircle />
                <span className="capitalize">cancel</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogCommunity
              title="Are you sure?"
              description="Are you sure you want to cancell your request."
              method={PrivateCommunityOperationEnum.CANCEL}
              operation="Ask for cancellation"
              param={row.original.id}
            />
          </AlertDialog>
        );
      },
    },
  ];
