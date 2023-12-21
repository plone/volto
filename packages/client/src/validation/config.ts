import { z } from 'zod';

/*
  PloneClientConfigSchema must remain in a separate file to avoid circular dependency
  between client.ts and restapi/login/post.ts that breaks zod.

  Related issue: https://github.com/colinhacks/zod/issues/1193
*/
export const PloneClientConfigSchema = z.object({
  apiPath: z.string(),
  token: z.string().optional(),
});

export type PloneClientConfig = z.infer<typeof PloneClientConfigSchema>;
