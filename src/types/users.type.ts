export type User = {
  address: any;
  createdAt: string;
  email: string;
  phone: string;
  firstName: string;
  id: number;
  lastName: string;
  photo: string;
  role: RoleEnum;
  status: StatusEnum;
  updatedAt: string;
};

export type UpdateUser = {
  address?: any;
  createdAt?: string;
  email?: string;
  firstName?: string;
  id?: number;
  lastName?: string;
  photo?: null;
  role?: number;
  status?: number;
  updatedAt?: string;
};

export enum RoleEnum {
  'USER' = 'USER',
  'ADMIN' = 'ADMIN',
  'STOREADMIN' = 'STOREADMIN',
}

export enum StatusEnum {
  'ACTIVE' = 'ACTIVE',
  'INACTIVE' = 'INACTIVE',
}

export const statusMap = {
  [StatusEnum.ACTIVE]: 2,
  [StatusEnum.INACTIVE]: 1,
};

export const roleMap = {
  [RoleEnum.ADMIN]: 2,
  [RoleEnum.USER]: 1,
  [RoleEnum.STOREADMIN]: 3,
};
