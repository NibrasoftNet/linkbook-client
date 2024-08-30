import * as z from 'zod';

import { createAddressSchema } from '@/validations/create-address-schema.validator';
import { createProductSchema } from '@/validations/create-product-schema.validator';

export const createDonationSchema = z.object({
  description: z.string(),
  quantity: z.number(),
  product: createProductSchema,
  address: createAddressSchema.optional().nullable(),
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: 'File size must be less than 4MB',
      }),
    )
    .max(5, {
      message: 'Maximum 5 files are allowed',
    })
    .optional()
    .nullable(),
});

export type DonationSchemaFormType = z.infer<typeof createDonationSchema>;
