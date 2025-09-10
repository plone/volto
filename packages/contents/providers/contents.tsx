import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useLoaderData } from 'react-router';
import type { ContentsLoaderType } from '../routes/contents';

import type { Key } from '@react-types/shared';
import type { ArrayElement } from '@plone/types';
import config from '@plone/registry';
import { type ToastItem } from '@plone/layout/config/toast';

type SetSelectedType = 'all' | 'none' | Set<Key>;

type Item = ArrayElement<
  Awaited<ReturnType<ContentsLoaderType>>['search']['items']
>;

interface ContentsContext {
  selected: Set<Item>;
  setSelected: (selected: SetSelectedType) => void;
  showDelete: boolean;
  setShowDelete: (s: boolean) => void;
  itemsToDelete: Set<Item>;
  setItemsToDelete: (s: Set<Item>) => void;
  showToast: (c: ToastItem) => void;
}

const ContentsContext = createContext<ContentsContext>({
  selected: new Set(),
  setSelected: () => {},
  showDelete: false,
  setShowDelete: () => {},
  itemsToDelete: new Set(),
  setItemsToDelete: () => {},
  showToast: (t: ToastItem) => {},
});

type ContentsProviderProps = PropsWithChildren;

export function ContentsProvider(props: ContentsProviderProps) {
  const { children } = props;

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

  //show toast
  const showToast = (queueElement: ToastItem) => {
    config
      .getUtility({
        name: 'show',
        type: 'toast',
      })
      .method(queueElement);
  };
  const ctx = {
    selected,
    setSelected,
    itemsToDelete,
    setItemsToDelete,
    showDelete,
    setShowDelete,
    showToast,
  };

  return (
    <ContentsContext.Provider value={ctx}>{children}</ContentsContext.Provider>
  );
}

export function useContentsContext(): ContentsContext {
  return useContext(ContentsContext);
}
