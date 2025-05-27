import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import type { Toast } from '../types';

interface ContentsContext {
  flattenToAppURL: (path?: string) => string | undefined;
  // getBaseUrl: (url?: string) => string | undefined;
  getContentIcon: (
    contentType?: string,
    isFolderish?: boolean,
    useQuantaIcons?: boolean,
  ) => JSX.ElementType;
  toast: Toast;
}

const ContentsContext = createContext<ContentsContext>({
  flattenToAppURL: (path) => path,
  // getBaseUrl: (url) => url,
  getContentIcon: () => undefined,
  toast: { error: () => '' },
});

type ContentsProviderProps = PropsWithChildren<ContentsContext>;

export function ContentsProvider(props: ContentsProviderProps) {
  let { children, flattenToAppURL, getContentIcon, toast } = props;

  let ctx = useMemo(
    () => ({
      flattenToAppURL,
      // getBaseUrl,
      getContentIcon,

      toast,
    }),
    [flattenToAppURL, getContentIcon, toast],
  );

  return (
    <ContentsContext.Provider value={ctx}>{children}</ContentsContext.Provider>
  );
}

export function useContentsContext(): ContentsContext {
  return useContext(ContentsContext);
}
