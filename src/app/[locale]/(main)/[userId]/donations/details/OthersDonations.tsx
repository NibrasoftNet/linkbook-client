'use client';

import React from 'react';

import DonationCard from '@/components/card/DonationCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useGetOthersDonations } from '@/tanstack/donations.query';
import type { DonationProps } from '@/types/donation.type';
import type { PaginationProps } from '@/types/types';

const OthersDonations = ({
  searchParams,
}: {
  searchParams: PaginationProps;
}) => {
  // { data: ApiResponsePaginated<DonationProps>; isPlaceholderData: any }
  const { data, isPlaceholderData } = useGetOthersDonations({
    page: searchParams.page,
    limit: searchParams.limit,
  });
  if (!data.result?.data) return <>No Donation Available</>;
  return (
    <section className="flex size-full flex-col items-center justify-between gap-4">
      <ul className="flex size-full flex-col items-center gap-4">
        {data?.result?.data.map((donation: DonationProps) => (
          <li
            key={donation.id}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="bg-primary-50 flex items-center justify-center"
          >
            <DonationCard donation={donation} />
          </li>
        ))}
      </ul>
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
              {data.result.meta.currentPage}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              aria-disabled={
                isPlaceholderData ||
                data.result.meta.totalPages === Number(searchParams.page)
              }
              href={`details?page=${Number(searchParams.page) + 1}&limit=${Number(searchParams.limit)}`}
              className="aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default OthersDonations;
