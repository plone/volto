import { useQuery } from '@tanstack/react-query';
import { getContentQuery } from '@plone/client/index.ts';

const ComponentTest = () => {
  const { isLoading, isError, data, error } = useQuery(
    getContentQuery({ path: '/' }),
  );
  console.log(data);
  return <div>{data?.title}</div>;
};

export default ComponentTest;
