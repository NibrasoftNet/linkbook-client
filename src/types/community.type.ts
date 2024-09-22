import type { Dispatch, SetStateAction } from 'react';

import type { ApplicantToCommunityValueType } from '@/types/applicant-to-community.type';
import type { ImagesProps } from '@/types/types';
import type { User } from '@/types/users.type';

export type CommunityValueType = {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  name: string;
  bio: string;
  creator: User;
  isPrivate: boolean;
  image?: ImagesProps | null;
  invitationCode?: string;
  subscribers?: ApplicantToCommunityValueType[];
};

export enum PrivateCommunityStatusEnum {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum PrivateCommunityOperationEnum {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  CANCEL = 'CANCEL',
  APPLY = 'APPLY',
}

export type CommunityContextType = {
  create: (value: any) => Promise<void>;
  update: (id: number, value: any) => Promise<void>;
  delete: (value: any) => Promise<void>;
  apply: (id: string) => Promise<void>;
  accept: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
  cancel: (id: string) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
