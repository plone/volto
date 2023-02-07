import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';

type ContentArgs = {
  path: string;
  version?: string;
  page?: number;
  fullObjects?: boolean;
};

export const getContent = async ({
  path,
  version,
  page,
  fullObjects,
}: ContentArgs): Promise<Content> => {
  const options: ApiRequestParams = {
    params: {
      ...(version && { version }),
      ...(fullObjects && { fullobjects: fullObjects }),
    },
  };
  if (version) {
    return handleRequest('get', `${path}/@history/${version}`, options);
  }
  return handleRequest('get', path, options);
};

export const getContentQuery = ({
  path,
  version,
  page,
  fullObjects,
}: ContentArgs) => ({
  queryKey: [path, 'get', 'content'],
  queryFn: async () => getContent({ path, version, page, fullObjects }),
});
