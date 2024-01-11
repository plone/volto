import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../validation/config';
import { copyMoveDataSchema as copyDataSchema } from '../../validation/copymove';
import { CopyMoveResponse as CopyResponse } from '@plone/types';

export const copyArgsSchema = z.object({
  data: copyDataSchema,
  config: PloneClientConfigSchema,
});

export type CopyArgs = z.infer<typeof copyArgsSchema>;

export const copy = async ({
  data,
  config,
}: CopyArgs): Promise<CopyResponse> => {
  const validatedArgs = copyArgsSchema.parse({
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  return apiRequest('post', '/@copy', options);
};

export const copyMutation = ({ config }: { config: PloneClientConfig }) => ({
  mutationKey: ['post', 'copy'],
  mutationFn: ({ data }: Omit<CopyArgs, 'config'>) => copy({ data, config }),
});
