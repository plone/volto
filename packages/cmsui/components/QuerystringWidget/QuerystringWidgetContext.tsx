import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';

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
  children: React.ReactNode;
}

/**
 * Default available fields based on typical Plone catalog indexes
 */
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
  availableFields = DEFAULT_FIELDS,
  availableSortFields = DEFAULT_SORT_FIELDS,
  children,
}: QuerystringProviderProps) {
  const [value, setValue] = useState<QuerystringValue>(initialValue);

  const addCriterion = useCallback(() => {
    setValue((prev) => ({
      ...prev,
      query: [
        ...(prev.query ?? []),
        {
          i: availableFields[0]?.name ?? '',
          o: availableFields[0]?.operators?.[0]?.value ?? '',
          v: '',
        },
      ],
    }));
  }, [availableFields]);

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
      availableFields,
      availableSortFields,
      value,
      setValue,
      addCriterion,
      removeCriterion,
      updateCriterion,
    }),
    [
      value,
      availableFields,
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
