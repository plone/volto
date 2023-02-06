import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';

type ContentArgs = {
  path: string;
  data: Content;
  headers?: any;
};

export const updateContent = async ({
  path,
  data,
  headers,
}: ContentArgs): Promise<Content> => {
  const options: ApiRequestParams = {
    data,
    headers,
  };
  return handleRequest('patch', path, options);
};

export const updateContentQuery = ({ path, data, headers }: ContentArgs) => ({
  queryKey: [path, 'patch', 'content'],
  queryFn: async () => updateContent({ path, data, headers }),
});
