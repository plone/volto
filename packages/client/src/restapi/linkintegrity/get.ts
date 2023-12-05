import { z } from 'zod';
import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfigSchema } from '../../interfaces/config';

const getLinkintegriyArgsSchema = z.object({
  uids: z.string(),
  config: PloneClientConfigSchema,
});

export type GetLinkintegrityArgs = z.infer<typeof getLinkintegriyArgsSchema>;

export const getLinkintegrity = async ({
  uids,
  config,
}: GetLinkintegrityArgs): Promise<any> => {
  const validatedArgs = getLinkintegriyArgsSchema.parse({
    uids,
    config,
  });

  const options: ApiRequestParams = {
    config,
    params: {
      ...(validatedArgs && { uids: validatedArgs.uids }),
    },
  };

  return apiRequest('get', '/@linkintegrity', options);
};

export const getLinkintegrityQuery = ({
  uids,
  config,
}: GetLinkintegrityArgs) => ({
  queryKey: ['get', 'linkintegrity'],
  queryFn: () => getLinkintegrity({ uids, config }),
});
