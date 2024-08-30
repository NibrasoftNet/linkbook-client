'use client';

import React from 'react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useDonation } from '@/providers/DonationContext';
import { DonationOperationEnum } from '@/types/donation.type';

const DonationActionButton = ({
  title,
  operation,
  id,
}: {
  title: string;
  operation: DonationOperationEnum;
  id: string;
}) => {
  const donation = useDonation();
  const handleOperation = async (id: string) => {
    if (operation === DonationOperationEnum.ACCEPT) {
      await donation.accept(id);
      return;
    }
    if (operation === DonationOperationEnum.REJECT) {
      await donation.reject(id);
    }
    if (operation === DonationOperationEnum.CANCEL) {
      await donation.cancel(id);
    }
  };

  return (
    <DropdownMenuItem onClick={() => handleOperation(id)}>
      {title}
    </DropdownMenuItem>
  );
};

export default DonationActionButton;
