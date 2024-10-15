import React from 'react';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface FlattenToAppURL {
  flattenToAppURL: (path: string | undefined) => string;
}

const FlattenToAppURLContext = createContext<FlattenToAppURL>({
  flattenToAppURL: (path) => path ?? '',
});

interface FlattenToAppURLProps {
  flattenToAppURL: (path: string | undefined) => string;
  children: ReactNode;
}

export function FlattenToAppURLProvider(props: FlattenToAppURLProps) {
  let { children, flattenToAppURL } = props;

  let ctx = useMemo(
    () => ({
      flattenToAppURL,
    }),
    [flattenToAppURL],
  );

  return (
    <FlattenToAppURLContext.Provider value={ctx}>
      {children}
    </FlattenToAppURLContext.Provider>
  );
}

export function useFlattenToAppURL(): FlattenToAppURL {
  return useContext(FlattenToAppURLContext);
}
