import React, { createContext, ReactNode, useContext, useMemo } from 'react';

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
});

interface AppRouterProps {
  useLocation: () => Location | undefined;
  navigate: (path: string) => void;
  children: ReactNode;
}

export function AppRouterProvider(props: AppRouterProps) {
  let { children, navigate, useLocation } = props;

  let ctx = useMemo(
    () => ({
      useLocation,
      navigate,
    }),
    [useLocation, navigate],
  );

  return (
    <AppRouterContext.Provider value={ctx}>
      {children}
    </AppRouterContext.Provider>
  );
}

export function useAppRouter() {
  return useContext(AppRouterContext);
}
