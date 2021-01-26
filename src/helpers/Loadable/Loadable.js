import React from 'react';
import { settings } from '~/config';
import { useDispatch, useSelector } from 'react-redux';
import { loadLazyLibrary } from '@plone/volto/actions';

export function useLoadables(maybeNames) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];
  const { loadables } = settings;
  const dispatch = useDispatch();

  const globalLoadedLibraries = useSelector(
    (state) => state.lazyLibraries || {},
  );

  const loaded = getLoadables(libraries, globalLoadedLibraries);

  libraries.forEach((name) => {
    const LoadableLibrary = loadables[name];
    if (!globalLoadedLibraries[name]) {
      LoadableLibrary.load().then((val) => {
        if (!globalLoadedLibraries[name] && val) {
          dispatch(loadLazyLibrary(name, val));
        }
      });
    }
    return;
  });

  // The component is rendered when all libraries are loaded!
  return loaded;
}

export function withLoadables(maybeNames) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];

  function decorator(WrappedComponent) {
    function WithLoadables(props) {
      const loaded = useLoadables(libraries);
      const isLoaded = Object.keys(loaded).length === libraries.length;
      return isLoaded ? (
        <WrappedComponent
          key={Object.keys(loaded).join('|')}
          {...props}
          {...loaded}
        />
      ) : null;
    }

    WithLoadables.displayName = `WithLoadables(${libraries.join(
      ',',
    )})(${getDisplayName(WrappedComponent)})`;

    return WithLoadables;
  }
  return decorator;
}

function getLoadables(names, loadedLibraries) {
  return Object.assign(
    {},
    ...names.map((libName) => ({ [libName]: loadedLibraries[libName] })),
  );
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
