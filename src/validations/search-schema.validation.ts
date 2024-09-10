import * as z from 'zod';

import { SearchTypeEnum, SubscriptionStatusEnum } from '@/types/types';

export const searchFormSchema = z.object({
  type: z.enum([
    SearchTypeEnum.DONATIONS,
    SearchTypeEnum.SWAPS,
    SearchTypeEnum.PURCHASES,
  ]),
  subscriptionStatus: z.enum([
    SubscriptionStatusEnum.SUBSCRIBED,
    SubscriptionStatusEnum.UNSUBSCRIBED,
  ]),
  city: z
    .string({
      message: 'Please select a city.',
    })
    .optional()
    .nullable(),
  category: z.number({
    message: 'Please select a category.',
  }),
});

export type SearchFormValues = z.infer<typeof searchFormSchema>;
