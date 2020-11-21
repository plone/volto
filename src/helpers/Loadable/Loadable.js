import React from 'react';
import { settings } from '~/config';
import { isEqual } from 'lodash';

export function withLoadables(maybeNames) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];

  function _wrapped(WrappedComponent) {
    class WithLoadables extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          loadedLibraries: {},
        };
      }

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
          ...this.state.loadedLibraries,
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
                    this.setState((state) => ({
                      loadedLibraries: {
                        ...state.loadedLibraries,
                        [name]: val,
                      },
                    }));
                  }}
                />
              );
            })}
            {isLoaded ? <WrappedComponent {...this.props} {...loaded} /> : null}
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
