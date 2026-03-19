import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useFetcher } from 'react-router';
import type { loader, BackendIndex } from '../../routes/queryStringOptions';

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

const DEFAULT_FIELDS: FieldMetadata[] = [
  {
    name: 'Creator',
    title: 'Creator',
    operators: [
      { value: 'is', label: 'is' },
      { value: 'is_not', label: 'is not' },
    ],
  },
  {
    name: 'Title',
    title: 'Title',
    operators: [
      { value: 'is', label: 'is' },
      { value: 'has', label: 'has' },
      { value: 'is_not', label: 'is not' },
    ],
    valueType: 'text',
  },
  {
    name: 'Description',
    title: 'Description',
    operators: [
      { value: 'is', label: 'is' },
      { value: 'has', label: 'has' },
      { value: 'is_not', label: 'is not' },
    ],
    valueType: 'text',
  },
  {
    name: 'Subject',
    title: 'Keywords',
    operators: [
      { value: 'is', label: 'is' },
      { value: 'is_not', label: 'is not' },
    ],
  },
  {
    name: 'path',
    title: 'Location',
    operators: [
      { value: 'is', label: 'is' },
      { value: 'is_not', label: 'is not' },
    ],
  },
  {
    name: 'modified',
    title: 'Last modified',
    operators: [
      { value: 'before', label: 'before' },
      { value: 'on', label: 'on' },
      { value: 'after', label: 'after' },
    ],
    valueType: 'date',
  },
  {
    name: 'created',
    title: 'Created',
    operators: [
      { value: 'before', label: 'before' },
      { value: 'on', label: 'on' },
      { value: 'after', label: 'after' },
    ],
    valueType: 'date',
  },
  {
    name: 'review_state',
    title: 'Review state',
    operators: [
      { value: 'is', label: 'is' },
      { value: 'is_not', label: 'is not' },
    ],
  },
];

const DEFAULT_SORT_FIELDS = [
  { value: 'Title', label: 'Title' },
  { value: 'Creator', label: 'Creator' },
  { value: 'modified', label: 'Last modified' },
  { value: 'created', label: 'Created' },
  { value: 'Subject', label: 'Keywords' },
];

export function QuerystringProvider({
  initialValue = {},
  availableFields,
  availableSortFields = DEFAULT_SORT_FIELDS,
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
    () =>
      availableFields ||
      (indexes ? transformBackendIndexes(indexes) : DEFAULT_FIELDS),
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

  const contextValue = useMemo(
    () => ({
      availableFields: fields,
      availableSortFields,
      value,
      setValue,
      addCriterion,
      removeCriterion,
      updateCriterion,
    }),
    [
      value,
      fields,
      availableSortFields,
      addCriterion,
      removeCriterion,
      updateCriterion,
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
