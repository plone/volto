import { useQuery } from '@tanstack/react-query';
import { getContentQuery } from '@plone/client/index.ts';
import { useLocation } from 'react-router-dom';
import config from '@plone/volto/registry';

const withQuery = (Component, query = getContentQuery) => ({ ...props }) => {
  const path = useLocation().pathname;
  // console.log(path);
  const expanders = config.settings.contentAPIExpanders;
  const { data } = useQuery(query({ path, expanders }));
  return <Component {...props} content={data} pathname={path} />;
};

export default withQuery;
