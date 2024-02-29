import React from 'react';
import { useSelector } from 'react-redux';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

/**
 * A HOC that injects querystring metadata information from the backend.
 *
 */
export default function withFacetsCount(WrappedComponent) {
  function WithFacetsCount(props) {
    const { id } = props;

    const facetsCount = useSelector((state) => {
      return state.querystringsearch.subrequests[id]?.facets_count;
    });

    return <WrappedComponent {...props} facetsCount={facetsCount} />;
  }
  WithFacetsCount.displayName = `WithFacetsCount(${getDisplayName(
    WrappedComponent,
  )})`;
  return WithFacetsCount;
}
