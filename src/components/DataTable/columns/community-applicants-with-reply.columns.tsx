import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import CommunityActionButton from '@/components/action-buttons/CommunityActionButton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { ApplicantToCommunityValueType } from '@/types/applicant-to-community.type';
import { PrivateCommunityOperationEnum } from '@/types/community.type';

export const communityApplicantsWithReplyListColumns: ColumnDef<ApplicantToCommunityValueType>[] =
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
      accessorKey: 'applicant.firstName',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize">
          {`${row.original.subscriber.firstName} ${
            row.original.subscriber.lastName
          }`}
        </div>
      ),
    },
    {
      accessorKey: 'applicant.address.city',
      header: 'Address',
      cell: ({ row }) => (
        <div className="capitalize">{row.original.subscriber.address.city}</div>
      ),
    },
    {
      accessorKey: 'applicant.email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="lowercase">{row.original.subscriber.email}</div>
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
              <CommunityActionButton
                title="accept"
                operation={PrivateCommunityOperationEnum.ACCEPT}
                id={row.original.id}
              />
              <DropdownMenuSeparator />
              <CommunityActionButton
                title="reject"
                operation={PrivateCommunityOperationEnum.REJECT}
                id={row.original.id}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
