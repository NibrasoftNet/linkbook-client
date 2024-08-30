import * as z from 'zod';

import { createAddressSchema } from '@/validations/create-address-schema.validator';

export const userUpdateProfileFormSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'Utilisateur a au moins 3 caractères' }),
  lastName: z
    .string()
    .min(3, { message: 'Utilisateur a au moins 3 caractères' }),
  phone: z
    .string()
    .min(10, { message: 'Utilisateur doit avoir au moins 10 caractères' }),
  photo: z
    .instanceof(File)
    .refine((file) => file.size < 4 * 1024 * 1024, {
      message: 'File size must be less than 4MB',
    })
    .optional()
    .nullable(),
  address: createAddressSchema.optional().nullable(),
});

export type UserUpdateProfileFormType = z.infer<
  typeof userUpdateProfileFormSchema
>;
