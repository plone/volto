import React from 'react';
import { settings } from '~/config';

export function withLoadables(maybeNames) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];

  function _wrapped(WrappedComponent) {
    class WithLoadables extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          loadedLibraries: {},
        };
        // this.refs = Object.assign(
        //   {},
        //   ...libraries.map((name) => ({ [name]: React.createRef() })),
        // );
      }

      render() {
        const { loadables } = settings;
        // const isLoaded =
        //   Object.keys(this.state.loadedLibraries).length === libraries.length;

        return (
          <>
            {libraries.map((name) => {
              const LoadableLibrary = loadables[name];
              return (
                <LoadableLibrary
                  key={name}
                  ref={(val) => {
                    console.log('val', val);
                    // this.refs[name] = val;
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
            <WrappedComponent
              {...this.props}
              {...Object.assign(
                {},
                ...libraries.map((name) => ({ [name]: loadables[name] })),
              )}
              {...this.state.loadedLibraries}
            />
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
// Object.assign(
//   {},
//   ...libraries.map((name) =>
//     loadables[name].preload ? {} : { [name]: loadables[name] },
//   ),
// ),
