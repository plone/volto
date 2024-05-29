import * as React from 'react';
import { Config, ConfigType } from '@plone/registry';

export const PloneRegistryContext = React.createContext<ConfigType | undefined>(
  undefined,
);

export const usePloneRegistry = () => {
  const config = React.useContext(PloneRegistryContext);

  if (!config) {
    throw new Error(
      'No registry config set, use instance or an instance of ConfigType from `@plone/registry` to set one',
    );
  }

  return config;
};

export type PloneRegistryProviderProps = {
  registryInstance: ConfigType;
  children?: React.ReactNode;
};

export const PloneRegistryProvider = ({
  registryInstance,
  children,
}: PloneRegistryProviderProps): JSX.Element => {
  return (
    <PloneRegistryContext.Provider value={registryInstance}>
      {children}
    </PloneRegistryContext.Provider>
  );
};
