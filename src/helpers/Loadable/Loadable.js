import React from 'react';
import { settings } from '~/config';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { loadLazyLibrary } from '@plone/volto/actions';

const isLoadableLoaded = (l) => {
  return !isEqual(Object.keys(l).sort(), [
    '$$typeof',
    'load',
    'preload',
    'render',
  ]);
};

const mergeLibs = (libNames) => {
  const { loadables } = settings;
  return Object.assign(
    {},
    ...libNames.map((name) =>
      isLoadableLoaded(loadables[name]) ? { [name]: loadables[name] } : {},
    ),
  );
};

function getLoadables(libNames, loadedLibs) {
  return {
    ...mergeLibs(libNames),

    // this is to support "loadables" that are already loaded
    ...loadedLibs,
  };
}

export function withLoadables(maybeNames) {
  const libNames = Array.isArray(maybeNames) ? maybeNames : [maybeNames];

  function decorator(WrappedComponent) {
    function WithLoadables(props) {
      const loadedLibs = useLoadables(libNames);

      return (
        Object.keys(loadedLibs).length > 0 && (
          <WrappedComponent
            key={Object.keys(loadedLibs).join('|')}
            {...props}
            {...loadedLibs}
          />
        )
      );
    }

    WithLoadables.displayName = `WithLoadables(${libNames.join(
      ',',
    )})(${getDisplayName(WrappedComponent)})`;

    return WithLoadables;
  }
  return decorator;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function useLoadables(maybeNames) {
  const libNames = Array.isArray(maybeNames) ? maybeNames : [maybeNames];
  const { loadables } = settings;
  const dispatch = useDispatch();

  const globalLoadedLibs = useSelector((state) => state.lazyLibraries || {});
  const loadedLibs = getLoadables(libNames, globalLoadedLibs);
  const allLoaded = Object.keys(loadedLibs).length === libNames.length;

  libNames.forEach((name) => {
    const LoadableLibrary = loadables[name];
    LoadableLibrary.load().then((val) => {
      if (!globalLoadedLibs[name] && val) {
        dispatch(loadLazyLibrary(name, val));
      }
    });
  });

  return allLoaded ? loadedLibs : {};
}
