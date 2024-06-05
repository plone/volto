import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { RouterProvider } from 'react-aria-components';
import { FlattenToAppURLProvider } from '@plone/components';
import { flattenToAppURL } from './utils';

export type AnySearchSchema = {};
export interface Location<TSearchObj extends AnySearchSchema = {}> {
  href: string;
  pathname: string;
  search: TSearchObj;
  searchStr: string;
  hash: string;
}

interface AppRouter {
  useLocation: () => Location | undefined;
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
  navigate: () => {},
  useHref: () => '',
  flattenToAppURL,
});

interface AppRouterProps {
  useLocation: () => Location | undefined;
  navigate: (path: string) => void;
  useHref?: (to: string, options?: any) => string;
  flattenToAppURL: (path: string | undefined) => string | undefined;
  children: ReactNode;
}

export function AppRouterProvider(props: AppRouterProps) {
  let { children, navigate, useLocation, useHref, flattenToAppURL } = props;

  let ctx = useMemo(
    () => ({
      useLocation,
      navigate,
      useHref,
      flattenToAppURL,
    }),
    [useLocation, navigate, useHref, flattenToAppURL],
  );

  return (
    <AppRouterContext.Provider value={ctx}>
      <RouterProvider navigate={navigate} useHref={useHref}>
        <FlattenToAppURLProvider flattenToAppURL={flattenToAppURL}>
          {children}
        </FlattenToAppURLProvider>
      </RouterProvider>
    </AppRouterContext.Provider>
  );
}

export function useAppRouter() {
  const { useLocation } = useContext(AppRouterContext);
  return useLocation();
}
