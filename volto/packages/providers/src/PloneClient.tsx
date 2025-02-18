import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PloneClient from '@plone/client';

export const PloneClientContext = React.createContext<
  InstanceType<typeof PloneClient> | undefined
>(undefined);

export const usePloneClient = () => {
  const client = React.useContext(PloneClientContext);

  if (!client) {
    throw new Error('No PloneClient set, use PloneClientProvider to set one');
  }

  return client;
};

export type PloneClientProviderProps = {
  client: InstanceType<typeof PloneClient>;
  queryClient: QueryClient;
  children?: React.ReactNode;
};

export const PloneClientProvider = ({
  client,
  queryClient,
  children,
}: PloneClientProviderProps): JSX.Element => {
  return (
    <PloneClientContext.Provider value={client}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </PloneClientContext.Provider>
  );
};
