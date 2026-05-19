import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useFetcher } from 'react-router';
import { useDebounceValue } from 'usehooks-ts';
import type { Brain } from '@plone/types';
import type { loader, BackendIndex } from '../../routes/queryStringOptions';
import type {
  loader as querystringSearchLoader,
  QuerystringSearchResult,
} from '../../routes/querystringSearch';

/**
 * Represents a single query criterion
 * i = field index name (e.g., "Creator", "Title", "path")
 * o = operator (e.g., "is", "has", "before")
 * v = value
 */
export interface QueryCriterion {
  i: string;
  o: string;
  v: any;
}

/**
 * The complete querystring widget value structure
 */
export interface QuerystringValue {
  query?: QueryCriterion[];
  depth?: number;
  sort_on?: string;
  sort_order?: 'ascending' | 'descending';
  limit?: number;
  b_size?: number;
}

/**
 * Metadata about available fields and their operators
 */
export interface FieldMetadata {
  name: string;
  title: string;
  operators: Array<{ value: string; label: string }>;
  valueType?: 'text' | 'date' | 'number' | 'select';
  valueOptions?: Array<{ value: string; label: string }>;
}

export function transformBackendIndexes(
  backendIndexes: Record<string, BackendIndex>,
): FieldMetadata[] {
  return Object.entries(backendIndexes)
    .filter(([_, index]) => index.enabled)
    .map(([name, index]) => {
      // Detect value type from operator widget and field title
      const firstOperatorWidget = Object.values(index.operators)[0]?.widget;
      let valueType: 'text' | 'date' | 'number' | 'select' = 'text';

      if (
        firstOperatorWidget?.includes('Date') ||
        index.title.toLowerCase().includes('date')
      ) {
        valueType = 'date';
      } else if (
        firstOperatorWidget?.includes('Number') ||
        firstOperatorWidget?.includes('Int')
      ) {
        valueType = 'number';
      } else if (firstOperatorWidget?.includes('Selection')) {
        valueType = 'select';
      }

      // Extract select options from values or vocabulary
      let valueOptions: Array<{ value: string; label: string }> | undefined;
      if (index.values && Object.keys(index.values).length > 0) {
        valueOptions = Object.entries(index.values).map(([key, val]) => ({
          value: key,
          label: val.title,
        }));
      }

      return {
        name,
        title: index.title,
        operators: Object.entries(index.operators).map(([key, op]) => ({
          value: key,
          label: op.title,
        })),
        valueType,
        valueOptions,
      };
    });
}

interface QuerystringContextType {
  availableFields: FieldMetadata[];
  availableSortFields: Array<{ value: string; label: string }>;
  value: QuerystringValue;
  setValue: (value: QuerystringValue) => void;
  addCriterion: () => void;
  removeCriterion: (index: number) => void;
  updateCriterion: (index: number, criterion: QueryCriterion) => void;
  searchItems: Brain[];
  searchTotal: number;
  searchLoading: boolean;
}

const QuerystringContext = createContext<QuerystringContextType | undefined>(
  undefined,
);

export interface QuerystringProviderProps {
  initialValue?: QuerystringValue;
  availableFields?: FieldMetadata[];
  availableSortFields?: Array<{ value: string; label: string }>;
  backendIndexes?: Record<string, BackendIndex>;
  children: React.ReactNode;
}

const EMPTY_ITEMS: Brain[] = [];

export function QuerystringProvider({
  initialValue = {},
  availableFields,
  availableSortFields = [],
  backendIndexes,
  children,
}: QuerystringProviderProps) {
  const fetcher = useFetcher<typeof loader>();

  // Fetch querystring options on mount
  useEffect(() => {
    if (fetcher.state === 'idle' && !fetcher.data) {
      fetcher.load('/@queryStringOptions');
    }
  }, [fetcher]);

  // Use transformed backend indexes from fetcher, prop, or defaults
  const fetchedIndexes = (fetcher.data as any)?.indexes;
  const indexes = backendIndexes || fetchedIndexes;

  const fields = useMemo(
    () => availableFields || (indexes ? transformBackendIndexes(indexes) : []),
    [availableFields, indexes],
  );

  const [value, setValue] = useState<QuerystringValue>(initialValue);

  const addCriterion = useCallback(() => {
    setValue((prev) => ({
      ...prev,
      query: [
        ...(prev.query ?? []),
        {
          i: fields[0]?.name ?? '',
          o: fields[0]?.operators?.[0]?.value ?? '',
          v: '',
        },
      ],
    }));
  }, [fields]);

  const removeCriterion = useCallback((index: number) => {
    setValue((prev) => ({
      ...prev,
      query: prev.query?.filter((_, i) => i !== index),
    }));
  }, []);

  const updateCriterion = useCallback(
    (index: number, criterion: QueryCriterion) => {
      setValue((prev) => {
        const newQuery = [...(prev.query ?? [])];
        newQuery[index] = criterion;
        return {
          ...prev,
          query: newQuery,
        };
      });
    },
    [],
  );

  const searchFetcher = useFetcher<typeof querystringSearchLoader>();

  const querySignature = useMemo(
    () => JSON.stringify(value.query ?? []),
    [value.query],
  );
  const [debouncedQuerySignature] = useDebounceValue(querySignature, 400);

  useEffect(() => {
    const criteria = JSON.parse(debouncedQuerySignature) as QueryCriterion[];
    if (!criteria || criteria.length === 0) return;
    searchFetcher.load(
      `/@querystringSearch?query=${encodeURIComponent(debouncedQuerySignature)}`,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuerySignature]);

  const searchData = searchFetcher.data as QuerystringSearchResult | undefined;
  const searchItems = searchData?.items ?? EMPTY_ITEMS;
  const searchTotal = searchData?.items_total ?? 0;
  const searchLoading = searchFetcher.state !== 'idle';

  const contextValue = useMemo(
    () => ({
      availableFields: fields,
      availableSortFields,
      value,
      setValue,
      addCriterion,
      removeCriterion,
      updateCriterion,
      searchItems,
      searchTotal,
      searchLoading,
    }),
    [
      value,
      fields,
      availableSortFields,
      addCriterion,
      removeCriterion,
      updateCriterion,
      searchItems,
      searchTotal,
      searchLoading,
    ],
  );

  return (
    <QuerystringContext.Provider value={contextValue}>
      {children}
    </QuerystringContext.Provider>
  );
}

export function useQuerystringContext(): QuerystringContextType {
  const context = useContext(QuerystringContext);
  if (!context) {
    throw new Error(
      'useQuerystringContext must be used within QuerystringProvider',
    );
  }
  return context;
}
