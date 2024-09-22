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
import { useCommunity } from '@/providers/CommunityContext';
import { PrivateCommunityOperationEnum } from '@/types/community.type';

const AlertDialogCommunity = ({
  title,
  description,
  method,
  operation,
  param,
  color,
}: {
  title: string;
  description: string;
  method: PrivateCommunityOperationEnum;
  operation: string;
  param: string;
  color?: string;
}) => {
  const community = useCommunity();
  const handleOperation = async () => {
    if (method === PrivateCommunityOperationEnum.CANCEL) {
      await community.cancel(param);
    }
    if (method === PrivateCommunityOperationEnum.APPLY) {
      await community.apply(param);
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

export default AlertDialogCommunity;
