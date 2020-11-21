import React from 'react';
import loadable from '@loadable/component';
import { settings } from '~/config';

// const LoadableToast = loadable.lib(() => import('react-toastify'));
//
// /**
//  * withToastify. A HOC that lazy-loads react-toastify and injects it as
//  * the `toastify` property to the wrapped component
//  *
//  * @param {} WrappedComponent
//  * @return Component
//  */
// export function withToastify(WrappedComponent) {
//   class WithLoadableToastify extends React.Component {
//     toastify = React.createRef();
//
//     render() {
//       return (
//         <>
//           <LoadableToast ref={this.toastify} />
//           <WrappedComponent
//             {...this.props}
//             toastify={
//               this.toastify.current ? this.toastify.current.toast : null
//             }
//           />
//         </>
//       );
//     }
//   }
//
//   WithLoadableToastify.displayName = `WithLoadableToastify(${getDisplayName(
//     WrappedComponent,
//   )})`;
//   return WithLoadableToastify;
// }

export function withLoadables(maybeNames) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];

  function _wrapped(WrappedComponent) {
    class WithLoadables extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          loadedLibraries: {},
        };

        this.libraryRefs = React.createRef({});
      }

      render() {
        const isLoaded =
          Object.keys(this.state.loadedLibraries).length === libraries.length;

        return (
          <>
            {libraries.map((name) => {
              const LoadableLibrary = settings.loadables[name];
              return (
                <LoadableLibrary
                  key={name}
                  ref={(val) => {
                    this.libraryRefs[name].current = val;
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
            {isLoaded ? (
              <WrappedComponent
                {...this.props}
                {...this.state.loadedLibraries}
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
