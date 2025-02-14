import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import { copyMoveDataSchema as copyDataSchema } from '../../validation/copymove';
import type { CopyMoveResponse as CopyResponse } from '@plone/types';

export type CopyArgs = z.infer<typeof copyDataSchema> & {
  config: PloneClientConfig;
};

export const copy = async ({
  path,
  data,
  config,
}: CopyArgs): Promise<CopyResponse> => {
  const validatedArgs = copyDataSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    config,
    data: validatedArgs.data,
  };

  const copyPath = `${validatedArgs.path}/@copy`;

  return apiRequest('post', copyPath, options);
};

export const copyMutation = ({ config }: { config: PloneClientConfig }) => ({
  mutationKey: ['post', 'copy'],
  mutationFn: ({ path, data }: Omit<CopyArgs, 'config'>) =>
    copy({ path, data, config }),
});
