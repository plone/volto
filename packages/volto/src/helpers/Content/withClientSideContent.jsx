/*
This is a HOC for use with the volto Edit component.
It makes sure that we fetch the content from the API on the client side
when the Edit component is mounted, if there is an internalApiPath
that is different from the public API path. Otherwise we might end up
saving backend API paths back to the server.

It's admittedly a bit of a workaround.
Ideally the volto SSR should produce correct URLs
so that we don't have to do this on the client side.
But, that requires refactoring that won't happen quickly...
*/

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import hoistNonReactStatics from 'hoist-non-react-statics';
import config from '@plone/volto/registry';
import { getContent } from '@plone/volto/actions/content/content';

export default function withClientSideContent(WrappedComponent) {
  function WithClientSideContent(props) {
    const { internalApiPath } = config.settings;
    const dispatch = useDispatch();
    const content = useSelector((state) => state.content);
    const id = content.data?.['@id'];
    useEffect(() => {
      if (internalApiPath && id?.startsWith(internalApiPath)) {
        dispatch(getContent(id.substring(internalApiPath.length)));
      }
    }, [internalApiPath, dispatch, id]);
    return <WrappedComponent {...props} />;
  }

  return hoistNonReactStatics(WithClientSideContent, WrappedComponent);
}
