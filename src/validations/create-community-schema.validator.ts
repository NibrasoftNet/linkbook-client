import * as z from 'zod';

export const createCommunitySchema = z.object({
  name: z.string(),
  bio: z.string(),
  isPrivate: z.boolean().default(false),
  files: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: 'File size must be less than 4MB',
      }),
    )
    .max(1, {
      message: 'Maximum 1 files are allowed',
    })
    .optional()
    .nullable(),
});

export type CommunitySchemaFormType = z.infer<typeof createCommunitySchema>;
