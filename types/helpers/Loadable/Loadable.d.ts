export function useLazyLibs(maybeNames: any, options?: {}): any;
export function preloadLazyLibs(maybeNames: any, forwardRef?: boolean): (WrappedComponent: any) => ((props: any) => JSX.Element) & hoistNonReactStatics.NonReactStatics<any, {}>;
export function injectLazyLibs(maybeNames: any, forwardRef?: boolean): (WrappedComponent: any) => ((props: any) => JSX.Element) & hoistNonReactStatics.NonReactStatics<any, {}>;
import hoistNonReactStatics from 'hoist-non-react-statics';
