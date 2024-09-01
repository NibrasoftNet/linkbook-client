'use client';

/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */

import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { User } from './columns';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPages,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams?.get('page') ?? '1', 10),
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const newParams = new URLSearchParams(searchParams?.toString());
    newParams.set('page', page.toString());
    router.push(`?${newParams.toString()}`);
  }, [page, router, searchParams]);

  const handleSort = (column: keyof User) => {
    const newParams = new URLSearchParams(searchParams?.toString());
    const currentSortBy = newParams.get('sortBy');
    const currentSortOrder = newParams.get('sortOrder');

    if (currentSortBy === column) {
      newParams.set('sortOrder', currentSortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      newParams.set('sortBy', column);
      newParams.set('sortOrder', 'asc');
    }

    router.push(`?${newParams.toString()}`);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const ellipsis = <span key="ellipsis">...</span>;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <Button
            key={i}
            variant={i === page ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPage(i)}
          >
            {i}
          </Button>,
        );
      }
    } else {
      buttons.push(
        <Button
          key={1}
          variant={page === 1 ? 'default' : 'outline'}
          size="sm"
          onClick={() => setPage(1)}
        >
          1
        </Button>,
      );

      if (page > 3) {
        buttons.push(ellipsis);
      }

      const startPage = Math.max(2, page - 1);
      const endPage = Math.min(totalPages - 1, page + 1);

      for (let i = startPage; i <= endPage; i++) {
        buttons.push(
          <Button
            key={i}
            variant={i === page ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPage(i)}
          >
            {i}
          </Button>,
        );
      }

      if (page < totalPages - 2) {
        buttons.push(ellipsis);
      }

      buttons.push(
        <Button
          key={totalPages}
          variant={totalPages === page ? 'default' : 'outline'}
          size="sm"
          onClick={() => setPage(totalPages)}
        >
          {totalPages}
        </Button>,
      );
    }

    return buttons;
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : (
                        <div
                          className="cursor-pointer select-none"
                          onClick={() =>
                            handleSort(header.column.id as keyof User)
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col items-center justify-between space-x-2 py-4 md:flex-row">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
          <div className="flex items-center space-x-1">
            {renderPaginationButtons()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((old) => (old < totalPages ? old + 1 : old))}
            disabled={page === totalPages}
          >
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
          >
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
