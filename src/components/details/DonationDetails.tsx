'use client';

import React from 'react';

import DonationDetailsCard from '@/components/card/DonationDetailsCard';
import { useGetSingleDonationQuery } from '@/tanstack/donations.query';
import type { DonationProps } from '@/types/donation.type';
import type { AxiosCustomResponse } from '@/types/types';

const DonationDetails = ({ id }: { id: string }) => {
  const { data }: { data: AxiosCustomResponse<DonationProps> } =
    useGetSingleDonationQuery(id);
  return <DonationDetailsCard donation={data.result} />;
};

export default DonationDetails;
