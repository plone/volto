import { Form } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { RecycleBinItemSummary } from '@plone/types';
import {
  getFilterOptions,
  type RecycleBinQueryState,
  type RecycleBinSortBy,
} from './utils';

const sortOptions: RecycleBinSortBy[] = [
  'date_desc',
  'date_asc',
  'title_asc',
  'title_desc',
  'type_asc',
  'type_desc',
  'workflow_asc',
  'workflow_desc',
];

export function RecycleBinFilters({
  items,
  queryState,
}: {
  items: RecycleBinItemSummary[];
  queryState: RecycleBinQueryState;
}) {
  const { t } = useTranslation();
  const types = getFilterOptions(items, '@type');
  const users = getFilterOptions(items, 'deleted_by');
  const languages = getFilterOptions(items, 'language');
  const workflowStates = getFilterOptions(items, 'review_state');

  return (
    <Form
      method="get"
      className={`
        my-6 grid gap-3
        md:grid-cols-4
      `}
    >
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.filters.search')}
        <input
          name="search_query"
          type="search"
          defaultValue={queryState.search_query ?? ''}
          className="rounded border border-quanta-silver px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.filters.type')}
        <select
          name="filter_type"
          defaultValue={queryState.filter_type ?? ''}
          className="rounded border border-quanta-silver px-3 py-2"
        >
          <option value="">{t('cmsui.recyclebin.filters.any')}</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.filters.deletedBy')}
        <select
          name="filter_deleted_by"
          defaultValue={queryState.filter_deleted_by ?? ''}
          className="rounded border border-quanta-silver px-3 py-2"
        >
          <option value="">{t('cmsui.recyclebin.filters.any')}</option>
          {users.map((user) => (
            <option key={user} value={user}>
              {user}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.filters.hasSubitems')}
        <select
          name="filter_has_subitems"
          defaultValue={queryState.filter_has_subitems ?? ''}
          className="rounded border border-quanta-silver px-3 py-2"
        >
          <option value="">{t('cmsui.recyclebin.filters.any')}</option>
          <option value="with_subitems">
            {t('cmsui.recyclebin.filters.withSubitems')}
          </option>
          <option value="without_subitems">
            {t('cmsui.recyclebin.filters.withoutSubitems')}
          </option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.filters.language')}
        <select
          name="filter_language"
          defaultValue={queryState.filter_language ?? ''}
          className="rounded border border-quanta-silver px-3 py-2"
        >
          <option value="">{t('cmsui.recyclebin.filters.any')}</option>
          {languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.filters.workflowState')}
        <select
          name="filter_workflow_state"
          defaultValue={queryState.filter_workflow_state ?? ''}
          className="rounded border border-quanta-silver px-3 py-2"
        >
          <option value="">{t('cmsui.recyclebin.filters.any')}</option>
          {workflowStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.filters.dateFrom')}
        <input
          name="date_from"
          type="date"
          defaultValue={queryState.date_from ?? ''}
          className="rounded border border-quanta-silver px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.filters.dateTo')}
        <input
          name="date_to"
          type="date"
          defaultValue={queryState.date_to ?? ''}
          className="rounded border border-quanta-silver px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.sort.label')}
        <select
          name="sort_by"
          defaultValue={queryState.sort_by ?? 'date_desc'}
          className="rounded border border-quanta-silver px-3 py-2"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>
              {t(`cmsui.recyclebin.sort.${option}`)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        {t('cmsui.recyclebin.pagination.pageSize')}
        <select
          name="b_size"
          defaultValue={queryState.b_size ?? '25'}
          className="rounded border border-quanta-silver px-3 py-2"
        >
          {[10, 25, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
      <div className="flex items-end gap-2">
        <button type="submit" className="rounded bg-brand px-4 py-2 text-white">
          {t('cmsui.recyclebin.filters.apply')}
        </button>
      </div>
    </Form>
  );
}
