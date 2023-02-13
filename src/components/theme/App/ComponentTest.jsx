import { useQuery } from '@tanstack/react-query';
import { getContentQuery } from '@plone/client/content/get.ts';

const ComponentTest = () => {
  const { isLoading, isError, data, error } = useQuery(
    getContentQuery({ path: '/' }),
  );

  if (data) {
    return <div>{data.title}</div>;
  }

  return 'Nothing';
};

export default ComponentTest;
