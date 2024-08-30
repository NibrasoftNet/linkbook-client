import * as z from 'zod';

export const createAddressSchema = z.object({
  country: z.string(),
  city: z.string(),
  longitude: z.number(),
  latitude: z.number(),
  countryFlag: z.string(),
  street: z.string(),
});
