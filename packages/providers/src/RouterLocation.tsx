import React, { createContext, ReactNode, useContext, useMemo } from 'react';

export type AnySearchSchema = {};
export interface Location<TSearchObj extends AnySearchSchema = {}> {
  href: string;
  pathname: string;
  search: TSearchObj;
  searchStr: string;
  hash: string;
}

interface RouterLocation {
  useLocation: () => Location | undefined;
}

const RouterLocationContext = createContext<RouterLocation>({
  useLocation: () => ({
    href: '',
    pathname: '',
    search: {},
    searchStr: '',
    hash: '',
  }),
});

interface RouterLocationProps {
  useLocation: () => Location | undefined;
  children: ReactNode;
}

export function RouterLocationProvider(props: RouterLocationProps) {
  let { children, useLocation } = props;

  let ctx = useMemo(
    () => ({
      useLocation,
    }),
    [useLocation],
  );

  return (
    <RouterLocationContext.Provider value={ctx}>
      {children}
    </RouterLocationContext.Provider>
  );
}

export function useRouterLocation() {
  const { useLocation } = useContext(RouterLocationContext);
  return useLocation();
}
