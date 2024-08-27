import type React from 'react';
import type { Dispatch, SetStateAction } from 'react';

import type { User } from '@/types/users.type';

export type AuthDrawerProp = {
  openAuthDrawer: boolean;
  setOpenAuthDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  operation: OperationEnum;
  email: string;
};

export enum OperationEnum {
  'confirm-account' = 'confirm-account',
  'reset-password' = 'reset-password',
  'delete-account' = 'delete-account',
}

export type AuthValuesType = {
  session: User | null;
  register: (value: any) => Promise<void>;
  login: (value: any) => Promise<void>;
  refresh: () => Promise<void>;
  forget: (value: any) => Promise<void>;
  reset: (value: any) => Promise<void>;
  logout: () => Promise<void>;
  confirmEmail: (value: any) => Promise<void>;
  verifyOtp: (value: any) => Promise<void>;
  openAuthDrawer: boolean;
  setOpenAuthDrawer: Dispatch<SetStateAction<boolean>>;
  email: string;
  setEmail: () => Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

export type SessionProps = {
  user: User;
  refreshToken: string;
  token: string;
  tokenExpires: number;
};

export type ServerSessionPros = {
  user: User;
  refreshToken: string;
  token: string;
  tokenExpires: number;
  exp: number;
  expires: number;
  iat: number;
};
