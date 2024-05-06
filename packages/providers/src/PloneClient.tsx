import * as React from 'react';

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
  children?: React.ReactNode;
};

export const PloneClientProvider = ({
  client,
  children,
}: PloneClientProviderProps): JSX.Element => {
  return (
    <PloneClientContext.Provider value={client}>
      {children}
    </PloneClientContext.Provider>
  );
};
