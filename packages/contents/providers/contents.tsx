import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useLoaderData } from 'react-router';
import type { ContentsLoaderType } from '../routes/contents';
import { UNSTABLE_ToastQueue as ToastQueue } from 'react-aria-components';
import type { ToastContent as MyToastContent } from '../types';
import type { Key } from '@react-types/shared';
import type { ArrayElement } from '@plone/types';

type SetSelectedType = 'all' | 'none' | Set<Key>;

type Item = ArrayElement<
  Awaited<ReturnType<ContentsLoaderType>>['search']['items']
>;

interface ContentsContext {
  toast: ToastQueue<MyToastContent>;
  selected: Set<Item>;
  setSelected: (selected: SetSelectedType) => void;
  showDelete: boolean;
  setShowDelete: (s: boolean) => void;
  itemsToDelete: Set<Item>;
  setItemsToDelete: (s: Set<Item>) => void;
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

type ContentsProviderProps = PropsWithChildren<Pick<ContentsContext, 'toast'>>;

export function ContentsProvider(props: ContentsProviderProps) {
  const { children, toast } = props;

  const { search } = useLoaderData<ContentsLoaderType>();
  const { items = [] } = search ?? {};
  //selected
  const [selected, _setSelected] = useState<Set<Item>>(new Set());

  const setSelected = useCallback(
    (s: SetSelectedType) => {
      if (s === 'all') {
        _setSelected(new Set(items));
      } else if (s === 'none') {
        _setSelected(new Set());
      } else {
        _setSelected(new Set(items.filter((i) => s.has(i['@id']))));
      }
    },
    [items],
  );

  //delete
  const [itemsToDelete, setItemsToDelete] = useState<Set<Item>>(new Set());
  const [showDelete, setShowDelete] = useState(false);

  const ctx = {
    selected,
    setSelected,
    itemsToDelete,
    setItemsToDelete,
    showDelete,
    setShowDelete,
    toast,
  };

  return (
    <ContentsContext.Provider value={ctx}>{children}</ContentsContext.Provider>
  );
}

export function useContentsContext(): ContentsContext {
  return useContext(ContentsContext);
}
