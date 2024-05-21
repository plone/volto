import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import type { IntlShape, Toast } from '../types';

interface ContentsContext {
  flattenToAppURL: (path?: string) => string | undefined;
  // getBaseUrl: (url?: string) => string | undefined;
  getContentIcon: (
    contentType?: string,
    isFolderish?: boolean,
    useQuantaIcons?: boolean,
  ) => JSX.ElementType;
  intl: IntlShape;
  toast: Toast;
}

const ContentsContext = createContext<ContentsContext>({
  flattenToAppURL: (path) => path,
  // getBaseUrl: (url) => url,
  getContentIcon: () => undefined,
  intl: { locale: 'en-US', formatMessage: () => '' },
  toast: { error: () => '' },
});

type ContentsProviderProps = PropsWithChildren<ContentsContext>;

export function ContentsProvider(props: ContentsProviderProps) {
  let { children, flattenToAppURL, getContentIcon, intl, toast } = props;

  let ctx = useMemo(
    () => ({
      flattenToAppURL,
      // getBaseUrl,
      getContentIcon,
      intl,
      toast,
    }),
    [flattenToAppURL, getContentIcon, intl, toast],
  );

  return (
    <ContentsContext.Provider value={ctx}>{children}</ContentsContext.Provider>
  );
}

export function useContentsContext(): ContentsContext {
  return useContext(ContentsContext);
}
