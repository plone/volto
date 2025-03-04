import { z } from 'zod';
import { type ApiRequestParams, apiRequest } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import { copyMoveDataSchema as moveDataSchema } from '../../validation/copymove';
import type { CopyMoveResponse as MoveResponse } from '@plone/types';

export type MoveArgs = z.infer<typeof moveDataSchema> & {
  config: PloneClientConfig;
};

export const move = async ({
  path,
  data,
  config,
}: MoveArgs): Promise<MoveResponse> => {
  const validatedArgs = moveDataSchema.parse({
    path,
    data,
  });

  const options: ApiRequestParams = {
    config,
    data: validatedArgs.data,
  };

  const movePath = `${validatedArgs.path}/@move`;

  return apiRequest('post', movePath, options);
};

export const moveMutation = ({ config }: { config: PloneClientConfig }) => ({
  mutationKey: ['post', 'move'],
  mutationFn: ({ path, data }: Omit<MoveArgs, 'config'>) =>
    move({ path, data, config }),
});
