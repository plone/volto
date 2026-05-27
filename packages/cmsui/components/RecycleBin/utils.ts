import type { RecycleBinItemSummary, RecycleBinQuery } from '@plone/types';

export type RecycleBinSortBy =
  | 'date_desc'
  | 'date_asc'
  | 'title_asc'
  | 'title_desc'
  | 'type_asc'
  | 'type_desc'
  | 'workflow_asc'
  | 'workflow_desc';

export type RecycleBinQueryState = {
  search_query?: string;
  filter_type?: string;
  filter_deleted_by?: string;
  filter_has_subitems?: 'with_subitems' | 'without_subitems';
  filter_language?: string;
  filter_workflow_state?: string;
  date_from?: string;
  date_to?: string;
  sort_by?: RecycleBinSortBy;
  b_start?: string;
  b_size?: string;
};

export const sortMap: Record<
  RecycleBinSortBy,
  Pick<RecycleBinQuery, 'sort_on' | 'sort_order'>
> = {
  date_desc: { sort_on: 'deletion_date', sort_order: 'descending' },
  date_asc: { sort_on: 'deletion_date', sort_order: 'ascending' },
  title_asc: { sort_on: 'title', sort_order: 'ascending' },
  title_desc: { sort_on: 'title', sort_order: 'descending' },
  type_asc: { sort_on: 'portal_type', sort_order: 'ascending' },
  type_desc: { sort_on: 'portal_type', sort_order: 'descending' },
  workflow_asc: { sort_on: 'review_state', sort_order: 'ascending' },
  workflow_desc: { sort_on: 'review_state', sort_order: 'descending' },
};

const queryKeys: Array<keyof RecycleBinQueryState> = [
  'search_query',
  'filter_type',
  'filter_deleted_by',
  'filter_has_subitems',
  'filter_language',
  'filter_workflow_state',
  'date_from',
  'date_to',
  'sort_by',
  'b_start',
  'b_size',
];

export const getQueryStateFromSearchParams = (
  searchParams: URLSearchParams,
): RecycleBinQueryState =>
  queryKeys.reduce<RecycleBinQueryState>((acc, key) => {
    const value = searchParams.get(key);
    if (value) {
      acc[key] = value as never;
    }
    return acc;
  }, {});

export const toRecycleBinQuery = (
  queryState: RecycleBinQueryState,
): RecycleBinQuery => {
  const query: RecycleBinQuery = {
    title: queryState.search_query,
    portal_type: queryState.filter_type,
    deleted_by: queryState.filter_deleted_by,
    language: queryState.filter_language,
    review_state: queryState.filter_workflow_state,
    date_from: queryState.date_from,
    date_to: queryState.date_to,
    b_start: queryState.b_start,
    b_size: queryState.b_size,
    ...(sortMap[queryState.sort_by ?? 'date_desc'] ?? sortMap.date_desc),
  };

  if (queryState.filter_has_subitems === 'with_subitems') {
    query.has_subitems = true;
  } else if (queryState.filter_has_subitems === 'without_subitems') {
    query.has_subitems = false;
  }

  return Object.fromEntries(
    Object.entries(query).filter(([, value]) => value !== undefined),
  ) as RecycleBinQuery;
};

export const removeQueryParamHref = (
  queryState: RecycleBinQueryState,
  key: keyof RecycleBinQueryState,
) => {
  const searchParams = new URLSearchParams();

  Object.entries(queryState).forEach(([paramKey, value]) => {
    if (paramKey !== key && value) {
      searchParams.set(paramKey, value);
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `/@@recyclebin?${queryString}` : '/@@recyclebin';
};

export const clearFiltersHref = () => '/@@recyclebin';

export const getFilterOptions = (
  items: RecycleBinItemSummary[],
  key: keyof Pick<
    RecycleBinItemSummary,
    '@type' | 'deleted_by' | 'language' | 'review_state'
  >,
) => Array.from(new Set(items.map((item) => item[key]).filter(Boolean))).sort();

export const formatRecycleBinDate = (value?: string, locale: string = 'en') => {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

export const getPagination = (
  total: number,
  bStart?: string,
  bSize?: string,
) => {
  const start = Number(bStart ?? 0);
  const size = Number(bSize ?? 25);
  const safeStart = Number.isFinite(start) ? start : 0;
  const safeSize = Number.isFinite(size) && size > 0 ? size : 25;
  const end = Math.min(safeStart + safeSize, total);

  return {
    start: total === 0 ? 0 : safeStart + 1,
    end,
    size: safeSize,
    previousStart: Math.max(0, safeStart - safeSize),
    nextStart: safeStart + safeSize,
    hasPrevious: safeStart > 0,
    hasNext: end < total,
  };
};
