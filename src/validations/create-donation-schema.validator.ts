import * as z from 'zod';

const createProductSchema = z.object({
  name: z.string(),
  categoryId: z.number(),
  description: z.string(),
  brand: z.string().optional().nullable(),
  modal: z.string().optional().nullable(),
  size: z.number().optional().nullable(),
  stock: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
});

const createAddressSchema = z.object({
  country: z.string(),
  city: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  countryFlag: z.string(),
  street: z.string(),
});

export const createDonationSchema = z.object({
  description: z.string(),
  quantity: z.number(),
  product: createProductSchema,
  address: createAddressSchema.optional().nullable(),
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

export type DonationSchemaFormType = z.infer<typeof createDonationSchema>;
