import type { User } from '@/types/users.type';

export type TestimonialsPropsType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  comment: string;
  rate: number;
  user: User;
};
