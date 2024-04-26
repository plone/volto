/**
 * A replacement for redux-connect's asyncConnect.
 *
 * It was needed because asyncConnect works as a direct wrapper on top of
 * a Component, so the config registry is not yet initialized. To solve this
 * problem we replace the original reduxAsyncConnect implementation (which was
 * a list of asyncConnected "object promises") with as single promise exposed
 * as { key: 'voltoLoadAsyncProps', promise: ... }.
 *
 * In more details, the original asyncConnect worked by replacing all our
 * "object promises" with a special version that's integrated with its own
 * Redux actions. We do another wrap, which takes the initial passed "object
 * promises", finds registered, per route, "extenders", calls these extenders
 * with the "object promises" and that's our "object promises" (which it calls
 * internally "asyncItems").
 */
export function asyncConnect(asyncItems: any, mapStateToProps?: any, mapDispatchToProps?: any, mergeProps?: any, options?: any): (Component: any) => any;
export const ReduxAsyncConnect: any;
export { loadOnServer, loadAsyncConnect } from "./ssr";
