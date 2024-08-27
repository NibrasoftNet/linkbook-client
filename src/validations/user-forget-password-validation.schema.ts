import * as z from 'zod';

export const userForgetPasswordValidationSchema = z.object({
  email: z.string().email('Email invalide!'),
});
