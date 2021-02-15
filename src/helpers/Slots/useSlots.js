import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSlots } from '@plone/volto/actions';

// TODO: this is not used at the moment

export default function useSlots(pathname) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getSlots(pathname));
  }, [pathname, dispatch]);

  const slots = useSelector((state) => state?.slots?.data || {});

  return slots;
}
