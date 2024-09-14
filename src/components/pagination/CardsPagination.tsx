import React from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { PaginationMeta, PaginationProps } from '@/types/types';

const CardsPagination = ({
  searchParams,
  meta,
  isPlaceholderData,
}: {
  searchParams: PaginationProps;
  meta: PaginationMeta;
  isPlaceholderData: any;
}) => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={Number(searchParams.page) <= 1}
            href={`details?page=${Number(searchParams.page) - 1}&limit=${Number(searchParams.limit)}`}
            className="aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive href="#">
            {meta.currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            aria-disabled={
              isPlaceholderData || meta.totalPages === Number(searchParams.page)
            }
            href={`details?page=${Number(searchParams.page) + 1}&limit=${Number(searchParams.limit)}`}
            className="aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CardsPagination;
