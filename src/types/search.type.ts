import type { Dispatch, SetStateAction } from 'react';

import type { AddressValueType } from '@/types/address.type';
import type { ProductProps } from '@/types/product.type';
import type { User } from '@/types/users.type';

export type SearchServiceProps = {
  createdAt: string;
  updatedAt: string;
  id: number;
  description: string;
  active: boolean;
  address: AddressValueType;
  creator: User;
  product: ProductProps;
};

export type SearchContextType = {
  getSearchPaginated: (value: any) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};
