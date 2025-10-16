'use client';

import { useFetcher } from 'react-router';
import {
  useCallback,
  useMemo,
  useState,
  useEffect,
  createContext,
  useContext,
  useId,
} from 'react';
import { useDebounceValue } from 'usehooks-ts';
import type { Selection, Key } from 'react-aria-components';
import type { Brain } from '@plone/types';
import {
  buildObjectBrowserUrl,
  processSelection,
  initializeSelectedKeys,
  type ObjectBrowserWidgetMode,
  useAccumulatedItems,
} from './utils';
import type { loader } from '../../routes/objectBrowserWidget';
import {
  ObjectBrowserNavigationProvider,
  useObjectBrowserNavigation,
} from './ObjectBrowserNavigationContext';

type PatternOptions = {
  maximumSelectionSize?: number;
  selectableTypes?: string[];
  basePath?: string;
  currentPath?: string;
} & Record<string, any>;

export interface UseObjectBrowserConfig {
  mode?: ObjectBrowserWidgetMode;
  widgetOptions?: {
    pattern_options?: PatternOptions;
  };
  selectedAttrs?: Array<keyof Brain>;
  // TODO: Also add blockchange/slate signature compat
  onChange?: (selected: Partial<Brain>[]) => void;
  defaultValue?: Brain[];
  title?: string;
  initialPath?: string;
}

// Hook interno che viene chiamato DOPO che il navigation context è disponibile
const useObjectBrowserInternal = (config: UseObjectBrowserConfig = {}) => {
  const {
    mode = 'multiple',
    widgetOptions = {},
    selectedAttrs = ['@id', 'title', 'description', '@type', 'UID'],
    onChange,
    defaultValue = [],
    title,
  } = config;
  const ariaControlsId = useId();
  const [open, setOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const fetcher = useFetcher<typeof loader>();
  const knownItems = useAccumulatedItems(fetcher, 'results');
  const [SearchableText, setSearchableText] = useDebounceValue<string>('', 350);
  const [selectedKeys, setSelectedKeys] = useState<
    Set<{ id: string; title: string }>
  >(() => initializeSelectedKeys(defaultValue));
  const { currentPath } = useObjectBrowserNavigation();

  // Funzioni esatte dal widget originale
  const filterBrainAttributes = useCallback(
    (brains: Brain[]) => {
      return brains.map(
        (item) =>
          Object.fromEntries(
            selectedAttrs
              .filter((attr) => attr in item)
              .map((attr) => [attr, item[attr]]),
          ) as Partial<Brain>,
      );
    },
    [selectedAttrs],
  );

  const handleSelectionChange = useCallback(
    (keys: Selection) => {
      const items = knownItems ?? [];
      const selected = processSelection(keys, items);

      const newSelectedKeys = new Set(
        selected.map((item) => ({ id: item['@id'], title: item.title })),
      );
      setSelectedKeys(newSelectedKeys);

      const filteredSelected = filterBrainAttributes(selected);
      onChange?.(filteredSelected);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [knownItems],
  );

  const handleRemove = useCallback(
    (keys: Set<Key>) => {
      const keysToRemove = new Set(keys);
      const newSelected = Array.from(selectedKeys).filter(
        (item) => !keysToRemove.has(item.id),
      );
      setSelectedKeys(new Set(newSelected));

      // Get complete Brain objects instead of just id/title
      const items = knownItems ?? [];
      const selectedBrains = newSelected
        .map(({ id }) => items.find((item) => item['@id'] === id))
        .filter((item): item is Brain => item !== undefined);

      const filteredSelected = filterBrainAttributes(selectedBrains);
      onChange?.(filteredSelected);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedKeys, knownItems],
  );

  const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchableText(value);
    },
    [setSearchableText],
  );

  function reset() {
    setSearchableText('');
    fetcher.load('/reset-fetcher');
  }

  async function loadData(currentPath?: string, SearchableText?: string) {
    const url = buildObjectBrowserUrl(currentPath, SearchableText);
    if (!url) return;
    await fetcher.load(url);
  }

  useEffect(() => {
    if (searchMode && SearchableText.trim() === '') reset();
    else loadData(currentPath, SearchableText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, searchMode, SearchableText]);

  const items = useMemo(
    () => fetcher?.data?.results?.items ?? [],
    [fetcher.data],
  );

  const breadcrumbs = useMemo(
    () => fetcher?.data?.breadcrumbs?.items ?? [],
    [fetcher.data],
  );

  const loading = fetcher.state === 'loading';
  const selectedItems = Array.from(selectedKeys).map((item) => item.id);
  return {
    // State
    open,
    setOpen,
    searchMode,
    setSearchMode,
    selectedKeys,
    setSelectedKeys,
    SearchableText,
    setSearchableText,
    items,
    breadcrumbs,
    knownItems,
    loading,
    fetcher,
    selectedItems,

    ariaControlsId,
    // Actions
    handleSelectionChange,
    handleRemove,
    handleSearchInputChange,
    loadData,
    reset,
    filterBrainAttributes,

    // Config
    mode,
    selectedAttrs,
    title,
    widgetOptions,
  };
};

export type UseObjectBrowserReturn = ReturnType<
  typeof useObjectBrowserInternal
>;

const ObjectBrowserContext = createContext<UseObjectBrowserReturn | null>(null);
// Componente interno che usa l'hook dopo che il navigation context è disponibile
function ObjectBrowserInternalProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: UseObjectBrowserConfig;
}) {
  const objectBrowser = useObjectBrowserInternal(config);

  const contextValue = useMemo(() => objectBrowser, [objectBrowser]);

  return (
    <ObjectBrowserContext.Provider value={contextValue}>
      {children}
    </ObjectBrowserContext.Provider>
  );
}

// Provider principale che gestisce l'ordine corretto dei provider annidati
export function ObjectBrowserProvider({
  children,
  config,
}: {
  children: React.ReactNode;
  config: UseObjectBrowserConfig;
}) {
  const { initialPath } = config;

  return (
    <ObjectBrowserNavigationProvider initialPath={initialPath}>
      <ObjectBrowserInternalProvider config={config}>
        {children}
      </ObjectBrowserInternalProvider>
    </ObjectBrowserNavigationProvider>
  );
}

export const useObjectBrowserContext = (): UseObjectBrowserReturn => {
  const context = useContext(ObjectBrowserContext);
  if (!context) {
    throw new Error(
      'useObjectBrowserContext must be used within an ObjectBrowserProvider',
    );
  }
  return context;
};

ObjectBrowserProvider.displayName = 'ObjectBrowserProvider';
