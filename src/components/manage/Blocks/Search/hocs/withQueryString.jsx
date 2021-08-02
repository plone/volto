import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuerystring } from '@plone/volto/actions';

export default (WrappedComponent) => {
  return (props) => {
    const dispatch = useDispatch();

    const qs = useSelector((state) => state.querystring);
    const indexes = qs?.indexes || {};

    React.useEffect(() => {
      if (Object.keys(indexes).length === 0) {
        dispatch(getQuerystring());
      }
    }, [dispatch, indexes]);

    return <WrappedComponent {...props} querystring={qs} />;
  };
};
