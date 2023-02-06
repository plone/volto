import { Content } from '../interfaces/content';
import API, { handleRequest } from '../API';

type ContentArgs = {
  path: string;
  version?: string;
  page?: number;
  fullObjects?: boolean;
};

const getContent = async ({
  path,
  version,
  page,
  fullObjects,
}: ContentArgs): Promise<Content> => {
  return handleRequest('get', path);
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
