import { getContent } from '@plone/volto/actions';
import { useSelector, useDispatch } from 'react-redux';
import { getBaseUrl } from '@plone/volto/helpers';
import { useEffect } from 'react';

const Ok = () => {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.content.get.loaded);
  useEffect(() => {
    dispatch(getContent(getBaseUrl('/')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loaded && 'OK';
};

export default Ok;
