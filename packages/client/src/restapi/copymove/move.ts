import { z } from 'zod';
import { ApiRequestParams, apiRequest } from '../../API';
import {
  PloneClientConfig,
  PloneClientConfigSchema,
} from '../../interfaces/config';
import {
  copyMoveDataSchema as moveDataSchema,
  CopyMoveResponse as MoveResponse,
} from '../../interfaces/copymove';

export const MoveArgsSchema = z.object({
  path: z.string(),
  data: moveDataSchema,
  config: PloneClientConfigSchema,
});

export type MoveArgs = z.infer<typeof MoveArgsSchema>;

export const move = async ({
  path,
  data,
  config,
}: MoveArgs): Promise<MoveResponse> => {
  const validatedArgs = MoveArgsSchema.parse({
    path,
    data,
    config,
  });

  const options: ApiRequestParams = {
    data: validatedArgs.data,
    config: validatedArgs.config,
  };

  const movePath = `/${validatedArgs.path}/@move`;

  return apiRequest('post', movePath, options);
};

export const moveMutation = ({ config }: { config: PloneClientConfig }) => ({
  mutationKey: ['post', 'move'],
  mutationFn: ({ path, data }: Omit<MoveArgs, 'config'>) =>
    move({ path, data, config }),
});
