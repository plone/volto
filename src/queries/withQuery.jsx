import { useQuery } from '@tanstack/react-query';
import { getContentQuery } from '@plone/client/index.ts';
import { useLocation } from 'react-router-dom';

const withQuery = (Component, query = getContentQuery) => ({ ...props }) => {
  const path = useLocation().pathname;
  const { data } = useQuery(query({ path }));
  return <Component {...props} content={data} pathname={path} />;
};

export default withQuery;
