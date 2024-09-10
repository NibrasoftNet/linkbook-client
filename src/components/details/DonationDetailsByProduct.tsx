'use client';

import React from 'react';

import DonationDetailsCard from '@/components/card/DonationDetailsCard';
import { useGetSingleDonationByProductIdQuery } from '@/tanstack/donations.query';
import type { DonationProps } from '@/types/donation.type';
import type { AxiosCustomResponse } from '@/types/types';

const DonationDetailsByProduct = ({ id }: { id: string }) => {
  const { data }: { data: AxiosCustomResponse<DonationProps> } =
    useGetSingleDonationByProductIdQuery(id);
  return <DonationDetailsCard donation={data.result} />;
};

export default DonationDetailsByProduct;
