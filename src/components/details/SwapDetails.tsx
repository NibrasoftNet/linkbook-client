'use client';

import React from 'react';

import SwapDetailsCard from '@/components/card/SwapDetailsCard';
import { useGetSingleSwapQuery } from '@/tanstack/swaps.query';
import type { SwapProps } from '@/types/swap.type';
import type { AxiosCustomResponse } from '@/types/types';

const SwapDetails = ({ id }: { id: string }) => {
  const { data }: { data: AxiosCustomResponse<SwapProps> } =
    useGetSingleSwapQuery(id);
  return <SwapDetailsCard swap={data.result} />;
};

export default SwapDetails;
