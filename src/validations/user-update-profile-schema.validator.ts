import * as z from 'zod';

export const photoSchema = z.object({
  id: z.string().optional().nullable(),
  path: z.string(),
});

export const userUpdateProfileFormSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'Utilisateur a au moins 3 caractères' }),
  lastName: z
    .string()
    .min(3, { message: 'Utilisateur a au moins 3 caractères' }),
  email: z.string().email('Email invalide!'),
  photo: photoSchema,
});
