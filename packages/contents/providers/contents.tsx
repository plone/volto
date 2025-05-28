import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import type { Toast } from '../types';
import { getContentIcon } from '@plone/helpers';

interface ContentsContext {
  toast: Toast;
  selected: Set<string>;
  setSelected: (
    selected: Set<string> | ((prev: Set<string>) => Set<string>),
  ) => void;
}

const ContentsContext = createContext<ContentsContext>({
  toast: { error: () => '' },
  selected: new Set(),
  setSelected: () => {},
});

type ContentsProviderProps = PropsWithChildren<ContentsContext>;

export function ContentsProvider(props: ContentsProviderProps) {
  let { toast, children } = props;

  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  // const setSelected = (s) => {
  //   if (s === 'all') {
  //     onSelectAll();
  //   } else {
  //     _setSelected(s);
  //   }
  // };
  let ctx = useMemo(
    () => ({
      // getBaseUrl,
      getContentIcon,
      toast,
      children,
      selected,
      setSelected,
    }),
    [toast, children, selected],
  );

  return (
    <ContentsContext.Provider value={ctx}>{children}</ContentsContext.Provider>
  );
}

export function useContentsContext(): ContentsContext {
  return useContext(ContentsContext);
}
