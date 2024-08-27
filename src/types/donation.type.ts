import type { Dispatch, SetStateAction } from 'react';

import type { AddressValueType } from '@/types/address.type';
import type { ProductProps, ProductValueType } from '@/types/product.type';

export type DonationValueType = {
  createdAt: string;
  updatedAt: string;
  id: number;
  description: string;
  active: boolean;
  product: ProductValueType;
  address: AddressValueType;
};

export type DonationsContextType = {
  create: (value: any) => Promise<void>;
  update: (id: number, value: any) => Promise<void>;
  delete: (value: any) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type DonationProps = {
  createdAt: string;
  updatedAt: string;
  id: number;
  description: string;
  active: boolean;
  product: ProductProps;
  address: AddressValueType;
  quantity: number;
  applicants: any;
};
