import React from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { omit } from 'lodash';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { loadLazyLibrary } from '@plone/volto/actions';

import { settings } from '~/config';

const validateLibs = (libs) => {
  if (Array.isArray(libs)) {
    return libs.map(validateLibs).filter((x) => !!x).length > 0;
  }
  const { loadables, lazyBundles } = settings;
  return (
    Object.keys(lazyBundles).includes(libs) ||
    Object.keys(loadables).includes(libs)
  );
};

/**
 * @param name {string|string[]} The name of a registered bundle, of a a lib or
 * an array of registered lib names.
 * @returns {string[]}
 */
const flattenLazyBundle = (name) => {
  const { lazyBundles } = settings;

  if (
    typeof name === 'string' &&
    typeof lazyBundles === 'object' &&
    Object.keys(lazyBundles).includes(name)
  ) {
    const val = lazyBundles[name];

    if (!validateLibs(name)) {
      debugger;
      throw new Error(`Invalid lib or bundle name ${name}`);
    }
    return Array.isArray(val) ? val : [val];
  }

  if (!validateLibs(name)) {
    debugger;
    throw new Error(`Invalid lib or bundle name ${name}`);
  }
  return Array.isArray(name) ? name : [name];
};

// TODO: make an unit test that checks if it is possible to have multiple
// useLoadables hooks inside a single component?
export function useLazyLibs(maybeNames, options = {}) {
  const libraries = flattenLazyBundle(maybeNames);
  const { shouldRerender = true } = options;
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
  return injectLazyLibs(maybeNames, forwardRef);
}

export function injectLazyLibs(maybeNames, forwardRef = false) {
  const decorator = (WrappedComponent) => {
    let libraries;

    function WithLoadables(props) {
      libraries = libraries || flattenLazyBundle(maybeNames);

      const loaded = useLazyLibs(libraries, { shouldRerender: true });
      const isLoaded = Object.keys(loaded).length === libraries.length;

      WithLoadables.displayName = `WithLoadables(${libraries.join(
        ',',
      )})(${getDisplayName(WrappedComponent)})`;

      return isLoaded ? (
        <WrappedComponent
          key={Object.keys(loaded).join('|')}
          {...omit(props, 'forwardedRef')}
          {...loaded}
          ref={forwardRef ? props.forwardedRef : null}
        />
      ) : null;
    }

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
