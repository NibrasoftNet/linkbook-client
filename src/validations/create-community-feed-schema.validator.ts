import * as z from 'zod';

export const createCommunityFeedSchema = z.object({
  title: z.string(),
  description: z.string(),
  communityId: z.number(),
  url: z.string(),
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

export type CommunityFeedSchemaFormType = z.infer<
  typeof createCommunityFeedSchema
>;
