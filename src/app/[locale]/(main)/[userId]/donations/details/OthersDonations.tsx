'use client';

import React from 'react';

import DonationCard from '@/components/card/DonationCard';
import { useGetOthersDonations } from '@/tanstack/donations.query';
import type { DonationProps } from '@/types/donation.type';
import type { ApiResponsePaginated } from '@/types/types';

const OthersDonations = () => {
  const { data }: { data: ApiResponsePaginated<DonationProps> } =
    useGetOthersDonations();
  if (!data.result.data) return <>No Donation Available</>;
  return (
    <ul className="flex flex-col items-center gap-4">
      {data?.result.data.map((donation: DonationProps) => (
        <li
          key={donation.id}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className="bg-primary-50 flex items-center justify-center"
        >
          <DonationCard donation={donation} />
        </li>
      ))}
    </ul>
  );
};

export default OthersDonations;
