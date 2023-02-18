import { useQuery } from '@tanstack/react-query';
import { getContentQuery } from '@plone/client/index.ts';
import { useLocation } from 'react-router-dom';
import config from '@plone/volto/registry';

const useContent = (props) => {
  const path = useLocation().pathname;
  const expanders = config.settings.contentAPIExpanders;
  const { data } = useQuery(getContentQuery({ path, expanders }));
  return data;
};

export default useContent;
