'use client';

import React from 'react';

import SwapCard from '@/components/card/SwapCard';
import { useGetOthersSwaps } from '@/tanstack/swaps.query';
import type { SwapProps } from '@/types/swap.type';
import type { ApiResponsePaginated } from '@/types/types';

const OthersSwaps = () => {
  const { data }: { data: ApiResponsePaginated<SwapProps> } =
    useGetOthersSwaps();
  if (!data.result.data) return <>No Swap Available</>;
  return (
    <ul className="flex flex-col items-center gap-4">
      {data?.result.data.map((swap: SwapProps) => (
        <li
          key={swap.id}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="bg-primary-50 flex items-center justify-center"
        >
          <SwapCard swap={swap} />
        </li>
      ))}
    </ul>
  );
};

export default OthersSwaps;
