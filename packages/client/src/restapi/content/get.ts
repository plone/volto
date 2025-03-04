import { apiRequest, ApiRequestParams } from '../../API';
import { PloneClientConfig } from '../../interfaces/config';
import { GetContentResponse } from '../../interfaces/content/get';
import { z } from 'zod';

const getContentArgsSchema = z.object({
  path: z.string(),
  version: z.string().optional(),
  page: z.number().optional(),
  fullObjects: z.boolean().optional(),
  expand: z.string().array().optional(),
});

export type ContentArgs = z.infer<typeof getContentArgsSchema> & {
  config: PloneClientConfig;
};

export const getContent = async ({
  path,
  version,
  page,
  fullObjects,
  expand,
  config,
}: ContentArgs): Promise<GetContentResponse> => {
  const validatedArgs = getContentArgsSchema.parse({
    path,
    version,
    page,
    fullObjects,
    expand,
  });

  const options: ApiRequestParams = {
    config,
    params: {
      ...(validatedArgs.page && { page: validatedArgs.page }),
      ...(validatedArgs.version && { version: validatedArgs.version }),
      ...(validatedArgs.fullObjects && {
        fullobjects: validatedArgs.fullObjects,
      }),
    },
  };
  if (validatedArgs.version) {
    return apiRequest(
      'get',
      `${path}/@history/${validatedArgs.version}`,
      options,
    );
  }
  if (validatedArgs.expand) {
    options.params = {
      ...options.params,
      expand,
    };
  }
  return apiRequest('get', path, options);
};

export const getContentQuery = ({
  path,
  version,
  page,
  fullObjects,
  expand,
  config,
}: ContentArgs) => ({
  queryKey: [path, 'get', 'content'],
  queryFn: () =>
    getContent({ path, expand, version, page, fullObjects, config }),
});
