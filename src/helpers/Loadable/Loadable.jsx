import React from 'react';
import loadable from '@loadable/component';

const LoadableToast = loadable.lib(() => import('react-toastify'));

export const loadables = {
  'prettier/standalone': loadable.lib(() => import('prettier/standalone')),
  'prettier/parser-html': loadable.lib(() => import('prettier/parser-html')),
  'prismjs/components/prism-core': loadable.lib(() =>
    import('prismjs/components/prism-core'),
  ),
  'prismjs/components/prism-markup': loadable.lib(() =>
    import('prismjs/components/prism-markup'),
  ),
};

/**
 * withToastify. A HOC that lazy-loads react-toastify and injects it as
 * the `toastify` property to the wrapped component
 *
 * @param {} WrappedComponent
 * @return Component
 */
export function withToastify(WrappedComponent) {
  class WithLoadableToastify extends React.Component {
    toastify = React.createRef();

    render() {
      return (
        <>
          <LoadableToast ref={this.toastify} />
          <WrappedComponent
            {...this.props}
            toastify={
              this.toastify.current ? this.toastify.current.toast : null
            }
          />
        </>
      );
    }
  }

  WithLoadableToastify.displayName = `WithLoadableToastify(${getDisplayName(
    WrappedComponent,
  )})`;
  return WithLoadableToastify;
}

// export function withLoadable(name) {
//   function _wrapped(WrappedComponent) {
//     class WithLoadableLibrary extends React.Component {
//       constructor(props) {
//         super(props);
//
//         this.state = {
//           loaded: false,
//         };
//
//         this.libraryRef = React.createRef();
//       }
//
//       LoadableLibrary = loadables[name];
//
//       render() {
//         const LoadableLibrary = this.LoadableLibrary;
//         return (
//           <>
//             <LoadableLibrary
//               ref={(val) => {
//                 this.libraryRef.current = val;
//                 this.setState({ loaded: true });
//               }}
//             />
//             {this.state.loaded ? (
//               <WrappedComponent
//                 {...this.props}
//                 {...{
//                   [name]: this.libraryRef,
//                 }}
//               />
//             ) : null}
//           </>
//         );
//       }
//     }
//
//     WithLoadableLibrary.displayName = `WithLoadableLibrary(${name})(${getDisplayName(
//       WrappedComponent,
//     )})`;
//
//     return WithLoadableLibrary;
//   }
//   return _wrapped;
// }

export function withLoadable(maybeNames) {
  const libraries = Array.isArray(maybeNames) ? maybeNames : [maybeNames];

  function _wrapped(WrappedComponent) {
    class WithLoadableLibrary extends React.Component {
      constructor(props) {
        super(props);

        this.state = {
          loadedLibraries: {},
        };

        this.libraryRefs = React.createRef({});
      }

      // LoadableLibrary = loadables[name];

      render() {
        const LoadableLibrary = this.LoadableLibrary;
        const isLoaded =
          Object.keys(this.state.loadedLibraries).length === libraries.length;

        return (
          <>
            {libraries.map((name) => (
              <LoadableLibrary
                key={name}
                ref={(val) => {
                  this.libraryRefs[name].current = val;
                  this.setState((state) => ({
                    loadedLibraries: { ...state.loadedLibraries, [name]: val },
                  }));
                }}
              />
            ))}
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

    WithLoadableLibrary.displayName = `WithLoadableLibrary(${libraries.join(
      ',',
    )})(${getDisplayName(WrappedComponent)})`;

    return WithLoadableLibrary;
  }
  return _wrapped;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
