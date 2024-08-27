import * as z from 'zod';

export const otpFormSchema = z.object({
  otp: z.string().min(6, {
    message: 'Your one-time password must be 6 characters.',
  }),
  email: z.string().email({ message: 'Email invalide!' }),
});
