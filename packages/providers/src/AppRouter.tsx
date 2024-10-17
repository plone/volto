import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { RouterProvider } from 'react-aria-components';
import { flattenToAppURL as defaultFlattenToAppURL } from './utils';

export type AnySearchSchema = {};
export interface Location<TSearchObj extends AnySearchSchema = {}> {
  href?: string; // TSR
  searchStr?: string; // TSR
  pathname: string; // TSR, RR and Remix
  search: TSearchObj; // TSR, RR and Remix
  hash: string; // TSR, RR and Remix
  state?: any; // TSR, RR and Remix
  key?: string; // RR and Remix
}

interface AppRouter {
  useLocation: () => Location | undefined;
  useParams: (opts?: any) => Record<string, string>;
  navigate: (path: string) => void;
  useHref: (to: string, options?: any) => string;
  flattenToAppURL: (path: string | undefined) => string | undefined;
}

const AppRouterContext = createContext<AppRouter>({
  useLocation: () => ({
    href: '',
    pathname: '',
    search: {},
    searchStr: '',
    hash: '',
  }),
  useParams: () => ({}),
  navigate: () => {},
  useHref: () => '',
  flattenToAppURL: defaultFlattenToAppURL,
});

interface AppRouterProps {
  useLocation: () => Location | undefined;
  useParams: (opts?: any) => Record<string, string>;
  navigate: (path: string) => void;
  useHref?: (to: string, options?: any) => string;
  flattenToAppURL: (path: string | undefined) => string | undefined;
  children: ReactNode;
}

export function AppRouterProvider(props: AppRouterProps) {
  let { children, navigate, useLocation, useParams, useHref, flattenToAppURL } =
    props;

  if (!flattenToAppURL) {
    flattenToAppURL = defaultFlattenToAppURL;
  }

  let ctx = useMemo(
    () => ({
      useLocation,
      useParams,
      navigate,
      useHref,
      flattenToAppURL,
    }),
    [useLocation, useParams, navigate, useHref, flattenToAppURL],
  );

  return (
    <AppRouterContext.Provider value={ctx}>
      <RouterProvider navigate={navigate} useHref={useHref}>
        {children}
      </RouterProvider>
    </AppRouterContext.Provider>
  );
}

export function useAppRouter() {
  return useContext(AppRouterContext);
}
