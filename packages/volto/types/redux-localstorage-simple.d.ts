declare module 'redux-localstorage-simple' {
  import type { Middleware } from 'redux';

  interface Options {
    states?: string[];
    ignoreStates?: string[];
    namespace?: string;
    namespaceSeparator?: string;
    debounce?: number;
    disableWarnings?: boolean;
  }

  interface LoadOptions extends Omit<Options, 'ignoreStates' | 'debounce'> {
    immutablejs?: boolean;
    preloadedState?: Record<string, unknown>;
  }

  export function save(options?: Options): Middleware;
  export function load(options?: LoadOptions): Record<string, unknown>;
  export function clear(options?: {
    namespace?: string;
    disableWarnings?: boolean;
  }): void;
  export function combineLoads(
    ...loads: Record<string, unknown>[]
  ): Record<string, unknown>;
}
