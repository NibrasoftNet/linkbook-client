import * as z from 'zod';

export const testimonialSchema = z.object({
  rate: z.number().min(1, { message: 'Please select a rate' }).max(5),
  comment: z
    .string()
    .min(10, { message: 'Comment must be at least 10 characters long' })
    .max(500, { message: 'Comment must not exceed 500 characters' }),
});

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
