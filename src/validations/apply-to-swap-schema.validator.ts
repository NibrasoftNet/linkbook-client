import * as z from 'zod';

import { createProductSchema } from '@/validations/create-product-schema.validator';

export const applyToSwapSchema = z.object({
  quantity: z.number(),
  product: createProductSchema,
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

export type ApplyToSwapSchemaFormType = z.infer<typeof applyToSwapSchema>;
