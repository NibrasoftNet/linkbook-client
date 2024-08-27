import * as z from 'zod';

import { passwordSchema } from '@/validations/user-register-validation.schema';

export const resetForgotPasswordSchema = z
  .object({
    email: z.string().email(),
    password: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmNewPassword;
    },
    {
      message: 'Le mot de passe de confirmation ne correspond pas !',
      path: ['confirmNewPassword'],
    },
  );
