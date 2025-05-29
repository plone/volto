import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import { getContentIcon } from '@plone/helpers';
import { useLoaderData } from 'react-router';
import type { ContentsLoaderType } from '../routes/contents';
import type { Toast } from '../types';
import type { Content } from '@plone/types';
import type { Key } from '@react-types/shared';

type SetSelectedType = 'all' | 'none' | Set<Key>;

interface ContentsContext {
  toast: Toast;
  selected: Set<Content>;
  setSelected: (selected: SetSelectedType) => void;
  showDelete: boolean;
  setShowDelete: (s: boolean) => void;
  itemsToDelete: Set<Content>;
  setItemsToDelete: (s: Set<Content>) => void;
}

const ContentsContext = createContext<ContentsContext>({
  toast: { error: () => '' },
  selected: new Set(),
  setSelected: () => {},
  showDelete: false,
  setShowDelete: () => {},
  itemsToDelete: new Set(),
  setItemsToDelete: () => {},
});

type ContentsProviderProps = PropsWithChildren<ContentsContext>;

export function ContentsProvider(props: ContentsProviderProps) {
  let { toast, children } = props;

  const { search } = useLoaderData<ContentsLoaderType>();
  const { items = [] } = search ?? {};
  //selected
  const [selected, _setSelected] = useState<Set<Content>>(new Set());

  const setSelected = (s: SetSelectedType) => {
    if (s === 'all') {
      _setSelected(items.map((item) => item));
    } else if (s === 'none') {
      _setSelected(new Set());
    } else {
      _setSelected(items.filter((i) => s.has(i['@id'])));
    }
  };

  //delete
  const [itemsToDelete, setItemsToDelete] = useState<Set<Content>>(new Set());
  const [showDelete, setShowDelete] = useState(false);

  let ctx = useMemo(
    () => ({
      // getBaseUrl,
      getContentIcon,
      toast,
      children,
      selected,
      setSelected,
      itemsToDelete,
      setItemsToDelete,
      showDelete,
      setShowDelete,
    }),
    [toast, children, selected, showDelete, itemsToDelete],
  );

  return (
    <ContentsContext.Provider value={ctx}>{children}</ContentsContext.Provider>
  );
}

export function useContentsContext(): ContentsContext {
  return useContext(ContentsContext);
}
