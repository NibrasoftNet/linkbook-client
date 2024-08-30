import * as z from 'zod';

export const createProductSchema = z.object({
  name: z.string(),
  categoryId: z.number(),
  description: z.string(),
  brand: z.string().optional().nullable(),
  modal: z.string().optional().nullable(),
  size: z.number().optional().nullable(),
  stock: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
});
