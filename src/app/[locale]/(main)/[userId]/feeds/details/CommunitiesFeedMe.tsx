'use client';

import { PlusSquareIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import CommunityFeedCard from '@/components/card/CommunityFeedCard';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useGetMyCommunitiesFeedsMe } from '@/tanstack/community-feed.query';
import type { CommunityFeedValueType } from '@/types/community-feed.type';
import type { PaginationProps } from '@/types/types';

const CommunitiesFeedMe = ({
  searchParams,
}: {
  searchParams: PaginationProps;
}) => {
  const { data, isPlaceholderData } = useGetMyCommunitiesFeedsMe({
    page: searchParams.page,
    limit: searchParams.limit,
  });
  if (!data.result.data) return <>No Feeds Available</>;
  return (
    <section className="flex size-full flex-col items-center justify-between gap-4">
      <Link
        type="button"
        href="details/create"
        className="flex w-full items-center justify-center md:w-1/3"
      >
        <Button className="flex w-full items-center justify-center gap-2">
          <PlusSquareIcon />
          <span>Create New Feed</span>
        </Button>
      </Link>
      <ul className="flex size-full flex-col items-center gap-4">
        {data?.result.data.map((feed: CommunityFeedValueType) => (
          <li
            key={feed.id}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="bg-primary-50 flex items-center justify-center"
          >
            <CommunityFeedCard feed={feed} />
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

export default CommunitiesFeedMe;
