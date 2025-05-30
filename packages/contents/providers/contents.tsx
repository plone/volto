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
import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components';
import type { ToastContent as MyToastContent } from '../types';
import type { Brain } from '@plone/types';
import type { Key } from '@react-types/shared';

type SetSelectedType = 'all' | 'none' | Set<Key>;

interface ContentsContext {
  toast: ToastQueue<MyToastContent>;
  selected: Set<Brain>;
  setSelected: (selected: SetSelectedType) => void;
  showDelete: boolean;
  setShowDelete: (s: boolean) => void;
  itemsToDelete: Set<Brain>;
  setItemsToDelete: (s: Set<Brain>) => void;
}

const ContentsContext = createContext<ContentsContext>({
  selected: new Set(),
  setSelected: () => {},
  showDelete: false,
  setShowDelete: () => {},
  itemsToDelete: new Set(),
  setItemsToDelete: () => {},
  toast: new ToastQueue(),
});

type ContentsProviderProps = PropsWithChildren<ContentsContext>;

export function ContentsProvider(props: ContentsProviderProps) {
  const { children, toast } = props;

  const { search } = useLoaderData<ContentsLoaderType>();
  const { items = [] } = search ?? {};
  //selected
  const [selected, _setSelected] = useState<Set<Brain>>(new Set());

  const setSelected = (s: SetSelectedType) => {
    if (s === 'all') {
      _setSelected(new Set(items));
    } else if (s === 'none') {
      _setSelected(new Set());
    } else {
      _setSelected(new Set(items.filter((i) => s.has(i['@id']))));
    }
  };

  //delete
  const [itemsToDelete, setItemsToDelete] = useState<Set<Brain>>(new Set());
  const [showDelete, setShowDelete] = useState(false);

  let ctx = useMemo(
    () => ({
      // getBaseUrl,
      getContentIcon,
      children,
      selected,
      setSelected,
      itemsToDelete,
      setItemsToDelete,
      showDelete,
      setShowDelete,
      toast,
    }),
    [children, selected, showDelete, itemsToDelete, toast],
  );

  return (
    <ContentsContext.Provider value={ctx}>{children}</ContentsContext.Provider>
  );
}

export function useContentsContext(): ContentsContext {
  return useContext(ContentsContext);
}
