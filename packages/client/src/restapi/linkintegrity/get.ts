import { z } from 'zod';
import { apiRequest, type ApiRequestParams } from '../../api';
import type PloneClient from '../../client';
import type { RequestResponse } from '../types';

const getLinkintegriyArgsSchema = z.object({
  uids: z.string(),
});

export type GetLinkintegrityArgs = z.infer<typeof getLinkintegriyArgsSchema>;

export async function getLinkintegrity(
  this: PloneClient,
  { uids }: GetLinkintegrityArgs,
): Promise<RequestResponse<any>> {
  const validatedArgs = getLinkintegriyArgsSchema.parse({
    uids,
  });

  const options: ApiRequestParams = {
    config: this.config,
    params: {
      ...(validatedArgs && { uids: validatedArgs.uids }),
    },
  };

  return apiRequest('get', '/@linkintegrity', options);
}
