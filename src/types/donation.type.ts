import type { Dispatch, SetStateAction } from 'react';

import type { AddressValueType } from '@/types/address.type';
import type { ProductProps, ProductValueType } from '@/types/product.type';
import type { User } from '@/types/users.type';

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
  apply: (id: string) => Promise<void>;
  accept: (id: string) => Promise<void>;
  reject: (id: string) => Promise<void>;
  cancel: (id: string) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type DonationProps = {
  createdAt: string;
  updatedAt: string;
  id: string;
  description: string;
  active: boolean;
  product: ProductProps;
  address: AddressValueType;
  quantity: number;
  applicants: User[];
  creator: User;
};

export type ApplicantToDonationType = {
  createdAt: string;
  updatedAt: string;
  id: string;
  donation: DonationProps;
  applicant: User;
  status: string;
  active: boolean;
};

export enum DonationStatusEnum {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export enum DonationOperationEnum {
  ACCEPT = 'ACCEPT',
  REJECT = 'REJECT',
  CANCEL = 'CANCEL',
  APPLY = 'APPLY',
}
