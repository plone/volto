import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuerystring } from '@plone/volto/actions';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * A HOC that injects querystring metadata information from the backend.
 *
 */
export default function withQueryString(WrappedComponent) {
  function WithQueryString(props) {
    const dispatch = useDispatch();

    const qs = useSelector((state) => state.querystring);
    // This showed up after updating eslint-plugin-react-hooks
    // TODO: fix it properly
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const indexes = qs?.indexes || {};

    React.useEffect(() => {
      if (Object.keys(indexes).length === 0) {
        dispatch(getQuerystring());
      }
    }, [dispatch, indexes]);

    return <WrappedComponent {...props} querystring={qs} />;
  }
  WithQueryString.displayName = `WithQueryString(${getDisplayName(
    WrappedComponent,
  )})`;
  return WithQueryString;
}
