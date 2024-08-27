import * as z from 'zod';

export const userResetPasswordFormSchema = z
  .object({
    oldPassword: z
      .string()
      .min(10, { message: 'Mot de passe a au moins 10 caractères' }),
    newPassword: z
      .string()
      .min(10, { message: 'Mot de passe a au moins 10 caractères' }),
    confirmedPassword: z
      .string()
      .min(10, { message: 'Mot de passe a au moins 10 caractères' }),
  })
  .refine(
    (values) => {
      return values.oldPassword !== values.newPassword;
    },
    {
      message: 'Ancien mot de passe utilisé!',
      path: ['newPassword'],
    },
  )
  .refine(
    (values) => {
      return values.newPassword === values.confirmedPassword;
    },
    {
      message: 'Confirmation mot de pass non identique!',
      path: ['confirmedPassword'],
    },
  );
