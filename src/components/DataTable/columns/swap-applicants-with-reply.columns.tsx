import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ImageIcon, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import SwapActionButton from '@/components/action-buttons/SwapActionButton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { imagesUrls } from '@/lib/constants';
import type { ApplicantToSwapType } from '@/types/swap.type';
import { SwapOperationEnum } from '@/types/swap.type';
import type { ImagesProps } from '@/types/types';

export const swapApplicantsWithReplyListColumns: ColumnDef<ApplicantToSwapType>[] =
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
      accessorKey: 'applicant.firstName',
      header: 'Name',
      cell: ({ row }) => (
        <div className="capitalize">
          {`${row.original.applicant.firstName} ${
            row.original.applicant.lastName
          }`}
        </div>
      ),
    },
    {
      accessorKey: 'applicant.phone',
      header: 'Phone',
      cell: ({ row }) => <div>{`${row.original.applicant.phone}`}</div>,
    },
    {
      accessorKey: 'applicant.product.image',
      header: 'Gallery',
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <ImageIcon className="mr-2 size-4" />
              Open Gallery
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <ul className="flex flex-wrap">
              {row.original.product.image.map((image: ImagesProps) => (
                // eslint-disable-next-line jsx-a11y/img-redundant-alt,react/jsx-key
                <Image
                  key={image.id}
                  src={image.path || imagesUrls.logoImage}
                  width={600}
                  height={400}
                  alt="Gallery Image"
                  className="aspect-video w-full rounded-md object-contain"
                />
              ))}
            </ul>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ),
    },
    {
      accessorKey: 'applicant.product.name',
      header: 'Product',
      cell: ({ row }) => (
        <div className="capitalize">{row.original.product.name}</div>
      ),
    },
    {
      accessorKey: 'applicant.quantity',
      header: 'Quantity',
      cell: ({ row }) => (
        <div className="lowercase">{row.original.quantity}</div>
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
              <SwapActionButton
                title="accept"
                operation={SwapOperationEnum.ACCEPT}
                id={row.original.id}
              />
              <DropdownMenuSeparator />
              <SwapActionButton
                title="reject"
                operation={SwapOperationEnum.REJECT}
                id={row.original.id}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
