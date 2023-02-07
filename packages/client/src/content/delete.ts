import { Content } from '../interfaces/content';
import { handleRequest } from '../API';

type ContentArgs = {
  path: string;
};

export const deleteContent = async ({
  path,
}: ContentArgs): Promise<Content> => {
  return handleRequest('delete', path);
};

export const deleteContentQuery = ({ path }: ContentArgs) => ({
  queryKey: [path, 'patch', 'content'],
  queryFn: async () => deleteContent({ path }),
});
