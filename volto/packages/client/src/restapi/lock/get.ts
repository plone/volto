import { apiRequest, type ApiRequestParams } from '../../API';
import type { PloneClientConfig } from '../../validation/config';
import { z } from 'zod';
import type { LockInfo as GetLockResponse } from '@plone/types';

const getLockSchema = z.object({
  path: z.string(),
});

export type LockArgs = z.infer<typeof getLockSchema> & {
  config: PloneClientConfig;
};

export const getLock = async ({
  path,
  config,
}: LockArgs): Promise<GetLockResponse> => {
  const validatedArgs = getLockSchema.parse({
    path,
  });

  const options: ApiRequestParams = {
    config,
    params: {},
  };
  const getLockPath = `/${validatedArgs.path}/@lock`;

  return apiRequest('get', getLockPath, options);
};

export const getLockQuery = ({ path, config }: LockArgs) => ({
  queryKey: [path, 'get', 'lock'],
  queryFn: () => getLock({ path, config }),
});
