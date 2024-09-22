import type { User } from '@/types/users.type';

export type ApplicantToDonationValueType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  applicant: User;
};
