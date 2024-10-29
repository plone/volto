import React, { createContext, ReactNode, useContext, useMemo } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { AppRouterProvider, Location } from './AppRouter';
import { PloneClientProvider } from './PloneClient';
import PloneClient from '@plone/client';
import { flattenToAppURL as defaultFlattenToAppURL } from './utils';

interface PloneProvider {
  ploneClient: InstanceType<typeof PloneClient>;
  queryClient: QueryClient;
  useLocation: () => Location | undefined;
  useParams: (opts?: any) => Record<string, string>;
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
  useParams: () => ({}),
  navigate: () => {},
  useHref: () => '',
  flattenToAppURL: defaultFlattenToAppURL,
});

interface PloneProviderProps {
  ploneClient: InstanceType<typeof PloneClient>;
  queryClient: QueryClient;
  useLocation: () => Location | undefined;
  useParams: (opts?: any) => Record<string, string>;
  navigate: (path: string) => void;
  useHref?: (to: string, options?: any) => string;
  flattenToAppURL?: (path: string | undefined) => string | undefined;
  children: ReactNode;
}

export function PloneProvider(props: PloneProviderProps) {
  let {
    children,
    navigate,
    useLocation,
    useParams,
    useHref,
    ploneClient,
    queryClient,
    flattenToAppURL,
  } = props;

  if (!flattenToAppURL) {
    flattenToAppURL = defaultFlattenToAppURL;
  }

  let ctx = useMemo(
    () => ({
      ploneClient,
      queryClient,
      useLocation,
      useParams,
      navigate,
      useHref,
      flattenToAppURL,
    }),
    [
      ploneClient,
      queryClient,
      useLocation,
      useParams,
      navigate,
      useHref,
      flattenToAppURL,
    ],
  );

  return (
    <PloneProviderContext.Provider value={ctx}>
      <PloneClientProvider client={ploneClient} queryClient={queryClient}>
        <AppRouterProvider
          navigate={navigate}
          useHref={useHref}
          useLocation={useLocation}
          useParams={useParams}
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
