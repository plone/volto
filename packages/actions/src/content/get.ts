import { Content } from '../interfaces/content';
import superagent from 'superagent';

type ContentArgs = {
  path: string;
  version?: string;
  page?: number;
  fullObjects?: boolean;
};

// const { isLoading, isError, data, error } = useQuery(getContentQuery(path));
const getContent = async ({
  path,
  version,
  page,
  fullObjects,
}: ContentArgs): Promise<Content> => {
  const response = await superagent.get(`${path}`).accept('application/json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.body;
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
