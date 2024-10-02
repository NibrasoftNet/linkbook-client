'use client';

import React from 'react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useSwap } from '@/providers/SwapContext';
import { SwapOperationEnum } from '@/types/swap.type';

const SwapActionButton = ({
  title,
  operation,
  id,
}: {
  title: string;
  operation: SwapOperationEnum;
  id: string;
}) => {
  const swap = useSwap();
  const handleOperation = async (id: string) => {
    if (operation === SwapOperationEnum.ACCEPT) {
      await swap.accept(id);
      return;
    }
    if (operation === SwapOperationEnum.REJECT) {
      await swap.reject(id);
    }
    if (operation === SwapOperationEnum.CANCEL) {
      await swap.cancel(id);
    }
  };

  return (
    <DropdownMenuItem onClick={() => handleOperation(id)}>
      {title}
    </DropdownMenuItem>
  );
};

export default SwapActionButton;
