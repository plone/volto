// Copied from https://github.com/remix-run/react-router/blob/main/packages/react-router/lib/router/history.ts
// We don't want a hard dependency on react-router, so we copy the types here
// In app code, we will use the proper import types from 'react-router'

/**
 * Actions represent the type of change to a location value.
 */
export enum Action {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Pop = 'POP',

  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */
  Push = 'PUSH',

  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */
  Replace = 'REPLACE',
}

/**
 * The pathname, search, and hash values of a URL.
 */
export interface Path {
  /**
   * A URL pathname, beginning with a /.
   */
  pathname: string;

  /**
   * A URL search string, beginning with a ?.
   */
  search: string;

  /**
   * A URL fragment identifier, beginning with a #.
   */
  hash: string;
}

// TODO: (v7) Change the Location generic default from `any` to `unknown` and
// remove Remix `useLocation` wrapper.

/**
 * An entry in a history stack. A location contains information about the
 * URL path, as well as possibly some arbitrary state and a key.
 */
export interface Location<State = any> extends Path {
  /**
   * A value of arbitrary data associated with this location.
   */
  state: State;

  /**
   * A unique string associated with this location. May be used to safely store
   * and retrieve data in some other storage API, like `localStorage`.
   *
   * Note: This value is always "default" on the initial location.
   */
  key: string;
}

/**
 * A change to the current location.
 */
export interface Update {
  /**
   * The action that triggered the change.
   */
  action: Action;

  /**
   * The new location.
   */
  location: Location;

  /**
   * The delta between this location and the former location in the history stack
   */
  delta: number | null;
}

/**
 * A function that receives notifications about location changes.
 */
export interface Listener {
  (update: Update): void;
}

/**
 * Describes a location that is the destination of some navigation used in
 * {@link Link}, {@link useNavigate}, etc.
 */
export type To = string | Partial<Path>;

/**
 * A history is an interface to the navigation stack. The history serves as the
 * source of truth for the current location, as well as provides a set of
 * methods that may be used to change it.
 *
 * It is similar to the DOM's `window.history` object, but with a smaller, more
 * focused API.
 */
export interface History {
  /**
   * The last action that modified the current location. This will always be
   * Action.Pop when a history instance is first created. This value is mutable.
   */
  readonly action: Action;

  /**
   * The current location. This value is mutable.
   */
  readonly location: Location;

  /**
   * Returns a valid href for the given `to` value that may be used as
   * the value of an <a href> attribute.
   *
   * @param to - The destination URL
   */
  createHref(to: To): string;

  /**
   * Returns a URL for the given `to` value
   *
   * @param to - The destination URL
   */
  createURL(to: To): URL;

  /**
   * Encode a location the same way window.history would do (no-op for memory
   * history) so we ensure our PUSH/REPLACE navigations for data routers
   * behave the same as POP
   *
   * @param to Unencoded path
   */
  encodeLocation(to: To): Path;

  /**
   * Pushes a new location onto the history stack, increasing its length by one.
   * If there were any entries in the stack after the current one, they are
   * lost.
   *
   * @param to - The new URL
   * @param state - Data to associate with the new location
   */
  push(to: To, state?: any): void;

  /**
   * Replaces the current location in the history stack with a new one.  The
   * location that was replaced will no longer be available.
   *
   * @param to - The new URL
   * @param state - Data to associate with the new location
   */
  replace(to: To, state?: any): void;

  /**
   * Navigates `n` entries backward/forward in the history stack relative to the
   * current index. For example, a "back" navigation would use go(-1).
   *
   * @param delta - The delta in the stack index
   */
  go(delta: number): void;

  /**
   * Sets up a listener that will be called whenever the current location
   * changes.
   *
   * @param listener - A function that will be called when the location changes
   * @returns unlisten - A function that may be used to stop listening
   */
  listen(listener: Listener): () => void;
}

type HistoryState = {
  usr: any;
  key?: string;
  idx: number;
};
