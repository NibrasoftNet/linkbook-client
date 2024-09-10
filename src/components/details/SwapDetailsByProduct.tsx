'use client';

import React from 'react';

import SwapDetailsCard from '@/components/card/SwapDetailsCard';
import { useGetSingleSwapByProductIdQuery } from '@/tanstack/swaps.query';
import type { SwapProps } from '@/types/swap.type';
import type { AxiosCustomResponse } from '@/types/types';

const SwapDetailsByProduct = ({ id }: { id: string }) => {
  const { data }: { data: AxiosCustomResponse<SwapProps> } =
    useGetSingleSwapByProductIdQuery(id);
  return <SwapDetailsCard swap={data.result} />;
};

export default SwapDetailsByProduct;
