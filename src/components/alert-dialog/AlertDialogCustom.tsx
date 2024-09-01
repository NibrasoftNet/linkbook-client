import React from 'react';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useDonation } from '@/providers/DonationContext';
import { useSwap } from '@/providers/SwapContext';
import { DonationOperationEnum } from '@/types/donation.type';
import { SwapOperationEnum } from '@/types/swap.type';

const AlertDialogCustom = ({
  title,
  description,
  method,
  operation,
  param,
  color,
}: {
  title: string;
  description: string;
  method: DonationOperationEnum | SwapOperationEnum;
  operation: string;
  param: string;
  color?: string;
}) => {
  const donation = useDonation();
  const swap = useSwap();
  const handleOperation = async () => {
    if (method === DonationOperationEnum.CANCEL) {
      await donation.cancel(param);
    }
    if (method === DonationOperationEnum.APPLY) {
      await donation.apply(param);
    }
    if (method === SwapOperationEnum.CANCEL) {
      await swap.cancel(param);
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction className={color || ''} onClick={handleOperation}>
          {operation}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default AlertDialogCustom;
