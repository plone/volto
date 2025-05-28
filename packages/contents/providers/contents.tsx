import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import type { Toast } from '../types';
import { flattenToAppURL, getContentIcon } from '@plone/helpers';

interface ContentsContext {
  toast: Toast;
}

const ContentsContext = createContext<ContentsContext>({
  toast: { error: () => '' },
});

type ContentsProviderProps = PropsWithChildren<ContentsContext>;

export function ContentsProvider(props: ContentsProviderProps) {
  let { toast, children } = props;

  let ctx = useMemo(
    () => ({
      flattenToAppURL,
      // getBaseUrl,
      getContentIcon,
      toast,
      children,
    }),
    [toast, children],
  );

  return (
    <ContentsContext.Provider value={ctx}>{children}</ContentsContext.Provider>
  );
}

export function useContentsContext(): ContentsContext {
  return useContext(ContentsContext);
}
