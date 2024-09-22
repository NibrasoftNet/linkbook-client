import type {
  CommunityValueType,
  PrivateCommunityStatusEnum,
} from '@/types/community.type';
import type { User } from '@/types/users.type';

export type ApplicantToCommunityValueType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  subscriber: User;
  community: CommunityValueType;
  status: PrivateCommunityStatusEnum;
};
