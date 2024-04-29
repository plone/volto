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
/**
 * Higher-order function that enhances a React component with asynchronous data fetching and Redux integration.
 *
 * @param {Array} asyncItems - An array of async items to fetch.
 * @param {Function} [mapStateToProps] - A function that maps the Redux state to component props.
 * @param {Function} [mapDispatchToProps] - A function that maps Redux dispatch to component props.
 * @param {Function} [mergeProps] - A function that merges the props from mapStateToProps, mapDispatchToProps, and the component's own props.
 * @param {Object} [options] - Additional options for configuring the async connect behavior.
 * @returns {Function} - A function that takes a React component and returns an enhanced component with async connect functionality.
 */
export function asyncConnect(asyncItems: any[], mapStateToProps?: Function, mapDispatchToProps?: Function, mergeProps?: Function, options?: any): Function;
export const ReduxAsyncConnect: any;
export { loadOnServer, loadAsyncConnect } from "./ssr";
