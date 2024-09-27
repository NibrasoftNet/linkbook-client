'use client';

import React from 'react';

import SwapCard from '@/components/card/SwapCard';
import CardsPagination from '@/components/pagination/CardsPagination';
import { useGetOthersSwaps } from '@/tanstack/swaps.query';
import type { SwapProps } from '@/types/swap.type';
import type { PaginationProps } from '@/types/types';

const OthersSwaps = ({ searchParams }: { searchParams: PaginationProps }) => {
  const { data, isPlaceholderData } = useGetOthersSwaps({
    page: searchParams.page,
    limit: searchParams.limit,
  });
  if (!data?.result?.data) return <>No Swap Available</>;
  return (
    <section className="flex size-full flex-col items-center justify-between gap-4">
      <ul className="flex flex-col items-center gap-4">
        {data?.result?.data.map((swap: SwapProps) => (
          <li
            key={swap.id}
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="bg-primary-50 flex items-center justify-center"
          >
            <SwapCard swap={swap} />
          </li>
        ))}
      </ul>
      <CardsPagination
        searchParams={searchParams}
        meta={data.result.meta}
        isPlaceholderData={isPlaceholderData}
      />
    </section>
  );
};

export default OthersSwaps;
