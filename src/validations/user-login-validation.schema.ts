import * as z from 'zod';

import { passwordSchema } from '@/validations/user-register-validation.schema';

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: passwordSchema,
  notificationsToken: z.string().nullable().optional(),
});
