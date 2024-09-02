import type { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ImageIcon, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import DonationActionButton from '@/components/action-buttons/DonationActionButton';
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
import { DonationOperationEnum } from '@/types/donation.type';
import type { ApplicantToSwapType } from '@/types/swap.type';

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
          DON-{String(row.getValue('id'))}
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
            <div className="grid grid-cols-3 gap-4">
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt,@next/next/no-img-element */}
              <img
                src={
                  row.original.product.image[0]?.path || imagesUrls.logoImage
                }
                width={600}
                height={400}
                alt="Gallery Image"
                className="aspect-video w-full rounded-md object-cover"
              />
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt,@next/next/no-img-element */}
              <img
                src={
                  row.original.product.image[0]?.path || imagesUrls.logoImage
                }
                width={600}
                height={400}
                alt="Gallery Image"
                className="aspect-video w-full rounded-md object-cover"
              />
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt,@next/next/no-img-element */}
              <img
                src={
                  row.original.product.image[0]?.path || imagesUrls.logoImage
                }
                width={600}
                height={400}
                alt="Gallery Image"
                className="aspect-video w-full rounded-md object-cover"
              />
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt,@next/next/no-img-element */}
              <img
                src={
                  row.original.product.image[0]?.path || imagesUrls.logoImage
                }
                width={600}
                height={400}
                alt="Gallery Image"
                className="aspect-video w-full rounded-md object-cover"
              />
              {/* eslint-disable-next-line jsx-a11y/img-redundant-alt,@next/next/no-img-element */}
              <img
                src={
                  row.original.product.image[0]?.path || imagesUrls.logoImage
                }
                width={600}
                height={400}
                alt="Gallery Image"
                className="aspect-video w-full rounded-md object-cover"
              />
            </div>
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
              <DonationActionButton
                title="accept"
                operation={DonationOperationEnum.ACCEPT}
                id={row.original.id}
              />
              <DropdownMenuSeparator />
              <DonationActionButton
                title="reject"
                operation={DonationOperationEnum.REJECT}
                id={row.original.id}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
