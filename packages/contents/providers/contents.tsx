import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import { getContentIcon } from '@plone/helpers';
import { useLoaderData } from 'react-router';
import type { Key } from '@react-types/shared';
import type { ContentsLoaderType } from '../routes/contents';
import type { Toast } from '../types';

type SetSelectedType = 'all' | 'none' | Set<Key>;

interface ContentsContext {
  toast: Toast;
  selected: Set<string>;
  setSelected: (selected: SetSelectedType) => void;
}

const ContentsContext = createContext<ContentsContext>({
  toast: { error: () => '' },
  selected: new Set(),
  setSelected: () => {},
});

type ContentsProviderProps = PropsWithChildren<ContentsContext>;

export function ContentsProvider(props: ContentsProviderProps) {
  let { toast, children } = props;

  const { search } = useLoaderData<ContentsLoaderType>();
  const { items = [] } = search ?? {};
  const [selected, _setSelected] = React.useState<Set<string>>(new Set());

  const setSelected = (s: SetSelectedType) => {
    if (s === 'all') {
      _setSelected(new Set(items.map((item) => item['@id'])));
    } else if (s === 'none') {
      _setSelected(new Set());
    } else {
      _setSelected(s);
    }
  };

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
