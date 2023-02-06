import { Content } from '../interfaces/content';
import { handleRequest, ApiRequestParams } from '../API';

type ContentArgs = {
  path: string;
  data: Content;
};

export const createContent = async ({
  path,
  data,
}: ContentArgs): Promise<Content> => {
  const options: ApiRequestParams = {
    data,
  };
  return handleRequest('post', path, options);
};

export const createContentQuery = ({ path, data }: ContentArgs) => ({
  queryKey: [path, 'post', 'content'],
  queryFn: async () => createContent({ path, data }),
});
