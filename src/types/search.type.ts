import type { AddressValueType } from '@/types/address.type';
import type { User } from '@/types/users.type';

export type SearchServiceProps = {
  createdAt: string;
  updatedAt: string;
  id: number;
  description: string;
  active: boolean;
  address: AddressValueType;
  creator: User;
};
