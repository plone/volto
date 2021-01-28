import React from 'react';
import { settings } from '~/config';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { loadLazyLibrary } from '@plone/volto/actions';
import { omit } from 'lodash';
import hoistNonReactStatics from 'hoist-non-react-statics';

// TODO: make an unit test that checks if it is possible to have multiple
// useLoadables hooks inside a single component?
// TODO: rename this to useLibs?
export function useLoadables(maybeNames, shouldRerender = true) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];
  const { loadables } = settings;
  const dispatch = useDispatch();

  const globalLoadedLibraries = useSelector(
    (state) => state.lazyLibraries || {},
    (left, right) => (shouldRerender ? shallowEqual(left, right) : true),
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

export function preloadLazyLibs(maybeNames, forwardRef = false) {
  return withLoadables(maybeNames, forwardRef, false);
}

// TODO: rename this to injectLibs
export function withLoadables(
  maybeNames,
  forwardRef = false,
  shouldRerender = true,
) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];

  const decorator = (WrappedComponent) => {
    function WithLoadables(props) {
      const loaded = useLoadables(libraries, shouldRerender);
      const isLoaded = Object.keys(loaded).length === libraries.length;
      return isLoaded ? (
        <WrappedComponent
          key={Object.keys(loaded).join('|')}
          {...omit(props, 'forwardedRef')}
          {...loaded}
          ref={forwardRef ? props.forwardedRef : null}
        />
      ) : null;
    }

    WithLoadables.displayName = `WithLoadables(${libraries.join(
      ',',
    )})(${getDisplayName(WrappedComponent)})`;

    if (forwardRef) {
      return hoistNonReactStatics(
        React.forwardRef((props, ref) => {
          return <WithLoadables {...props} forwardedRef={ref} />;
        }),
        WrappedComponent,
      );
    }

    return hoistNonReactStatics(WithLoadables, WrappedComponent);
  };

  return decorator;
}

function getLoadables(names, loadedLibraries) {
  return Object.assign(
    {},
    ...names.map((libName) =>
      loadedLibraries[libName] ? { [libName]: loadedLibraries[libName] } : {},
    ),
  );
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
