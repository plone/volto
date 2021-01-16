import React from 'react';
import { settings } from '~/config';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { loadLazyLibrary } from '@plone/volto/actions';

function getLoadables(libraries, loadedLibraries) {
  const { loadables } = settings;
  return {
    ...Object.assign(
      {},
      ...libraries.map((name) =>
        !isEqual(Object.keys(loadables[name]).sort(), [
          '$$typeof',
          'load',
          'preload',
          'render',
        ])
          ? { [name]: loadables[name] }
          : {},
      ),
    ), // this is to support "loadables" that are already loaded
    ...loadedLibraries,
  };
}

export function withLoadables(maybeNames) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];

  function decorator(WrappedComponent) {
    function WithLoadables(props) {
      const { loadables } = settings;
      const dispatch = useDispatch();

      const globalLoadedLibraries = useSelector(
        (state) => state.lazyLibraries || {},
      );
      const loaded = getLoadables(libraries, globalLoadedLibraries);
      const isLoaded = Object.keys(loaded).length === libraries.length;

      return (
        <>
          {libraries.map((name) => {
            const LoadableLibrary = loadables[name];
            return (
              <LoadableLibrary
                key={name}
                ref={(val) => {
                  if (!globalLoadedLibraries[name] && val) {
                    dispatch(loadLazyLibrary(name, val));
                  }
                }}
              />
            );
          })}
          {isLoaded ? (
            <WrappedComponent
              key={Object.keys(loaded).join('|')}
              {...props}
              {...loaded}
            />
          ) : null}
        </>
      );
    }

    WithLoadables.displayName = `WithLoadables(${libraries.join(
      ',',
    )})(${getDisplayName(WrappedComponent)})`;

    return WithLoadables;
  }
  return decorator;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
