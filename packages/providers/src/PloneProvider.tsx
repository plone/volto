import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { AppRouterProvider, Location } from './AppRouter';
import { PloneClientProvider } from './PloneClient';
import PloneClient from '@plone/client';
import { flattenToAppURL } from './utils';

interface PloneProvider {
  ploneClient: InstanceType<typeof PloneClient>;
  queryClient: QueryClient;
  useLocation: () => Location | undefined;
  navigate: (path: string) => void;
  useHref: (to: string, options?: any) => string;
  flattenToAppURL: (path: string | undefined) => string | undefined;
}

const PloneProviderContext = createContext<PloneProvider>({
  ploneClient: null,
  queryClient: null,
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

interface PloneProviderProps {
  ploneClient: InstanceType<typeof PloneClient>;
  queryClient: QueryClient;
  useLocation: () => Location | undefined;
  navigate: (path: string) => void;
  useHref?: (to: string, options?: any) => string;
  flattenToAppURL: (path: string | undefined) => string | undefined;
  children: ReactNode;
}

export function PloneProvider(props: PloneProviderProps) {
  let { children, navigate, useLocation, useHref, ploneClient, queryClient } =
    props;

  let ctx = useMemo(
    () => ({
      ploneClient,
      queryClient,
      useLocation,
      navigate,
      useHref,
      flattenToAppURL,
    }),
    [ploneClient, queryClient, useLocation, navigate, useHref, flattenToAppURL],
  );

  return (
    <PloneProviderContext.Provider value={ctx}>
      <PloneClientProvider client={ploneClient} queryClient={queryClient}>
        <AppRouterProvider
          navigate={navigate}
          useHref={useHref}
          useLocation={useLocation}
          flattenToAppURL={flattenToAppURL}
        >
          {children}
        </AppRouterProvider>
      </PloneClientProvider>
    </PloneProviderContext.Provider>
  );
}

export function usePloneProvider() {
  return useContext(PloneProviderContext);
}
