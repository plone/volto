import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  clearFiltersHref,
  removeQueryParamHref,
  type RecycleBinQueryState,
} from './utils';

const activeFilterLabels: Record<keyof RecycleBinQueryState, string> = {
  search_query: 'cmsui.recyclebin.filters.search',
  filter_type: 'cmsui.recyclebin.filters.type',
  filter_deleted_by: 'cmsui.recyclebin.filters.deletedBy',
  filter_has_subitems: 'cmsui.recyclebin.filters.hasSubitems',
  filter_language: 'cmsui.recyclebin.filters.language',
  filter_workflow_state: 'cmsui.recyclebin.filters.workflowState',
  date_from: 'cmsui.recyclebin.filters.dateFrom',
  date_to: 'cmsui.recyclebin.filters.dateTo',
  sort_by: 'cmsui.recyclebin.sort.label',
  b_start: 'cmsui.recyclebin.pagination.start',
  b_size: 'cmsui.recyclebin.pagination.pageSize',
};

export function RecycleBinActiveFilters({
  queryState,
}: {
  queryState: RecycleBinQueryState;
}) {
  const { t } = useTranslation();
  const activeFilters = Object.entries(queryState).filter(
    ([key, value]) =>
      value && key !== 'b_start' && key !== 'b_size' && key !== 'sort_by',
  ) as Array<[keyof RecycleBinQueryState, string]>;

  if (activeFilters.length === 0) return null;

  return (
    <div className="my-4 flex flex-wrap items-center gap-2">
      {activeFilters.map(([key, value]) => (
        <Link
          key={key}
          to={removeQueryParamHref(queryState, key)}
          className={`
            inline-flex items-center gap-1 rounded border border-quanta-silver px-2 py-1 text-sm
            text-quanta-iron
          `}
        >
          {t(activeFilterLabels[key])}: {value}
          <span aria-hidden="true" className="text-base leading-none">
            x
          </span>
        </Link>
      ))}
      <Link to={clearFiltersHref()} className="text-sm text-brand underline">
        {t('cmsui.recyclebin.filters.clearAll')}
      </Link>
    </div>
  );
}
