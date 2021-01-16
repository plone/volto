import React from 'react';
import { settings } from '~/config';
import { isEqual } from 'lodash';

const _loadablesCache = {};

export function withLoadables(maybeNames) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];

  function _wrapped(WrappedComponent) {
    class WithLoadables extends React.Component {
      getLoadables() {
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
          ..._loadablesCache,
        };
      }

      render() {
        const { loadables } = settings;
        const loaded = this.getLoadables();
        const isLoaded = Object.keys(loaded).length === libraries.length;

        return (
          <>
            {libraries.map((name) => {
              const LoadableLibrary = loadables[name];
              return (
                <LoadableLibrary
                  key={name}
                  ref={(val) => {
                    if (!_loadablesCache[name] && val) {
                      _loadablesCache[name] = val;
                      this.forceUpdate();
                    }
                  }}
                />
              );
            })}
            {isLoaded ? (
              <WrappedComponent
                key={Object.keys(loaded).join('|')}
                {...this.props}
                {...loaded}
              />
            ) : null}
          </>
        );
      }
    }

    WithLoadables.displayName = `WithLoadables(${libraries.join(
      ',',
    )})(${getDisplayName(WrappedComponent)})`;

    return WithLoadables;
  }
  return _wrapped;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
