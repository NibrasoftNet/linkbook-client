'use client';

import React from 'react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useCommunity } from '@/providers/CommunityContext';
import { PrivateCommunityOperationEnum } from '@/types/community.type';

const CommunityActionButton = ({
  title,
  operation,
  id,
}: {
  title: string;
  operation: PrivateCommunityOperationEnum;
  id: string;
}) => {
  const community = useCommunity();
  const handleOperation = async (id: string) => {
    if (operation === PrivateCommunityOperationEnum.ACCEPT) {
      await community.accept(id);
      return;
    }
    if (operation === PrivateCommunityOperationEnum.REJECT) {
      await community.reject(id);
    }
    if (operation === PrivateCommunityOperationEnum.CANCEL) {
      await community.cancel(id);
    }
  };

  return (
    <DropdownMenuItem onClick={() => handleOperation(id)}>
      {title}
    </DropdownMenuItem>
  );
};

export default CommunityActionButton;
