import type { Dispatch, SetStateAction } from 'react';

import type { CommunityValueType } from '@/types/community.type';
import type { ImagesProps } from '@/types/types';
import type { User } from '@/types/users.type';

export type CommunityFeedValueType = {
  createdAt: Date;
  updatedAt: Date;
  id: number;
  title: string;
  description: string;
  url: string;
  creator: User;
  community: CommunityValueType;
  image: ImagesProps[];
};

export type CommunityFeedContextType = {
  create: (value: any) => Promise<void>;
  update: (id: number, value: any) => Promise<void>;
  delete: (value: any) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
