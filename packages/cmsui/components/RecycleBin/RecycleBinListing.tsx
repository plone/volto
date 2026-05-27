import { useState } from 'react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { GetRecycleBinResponse } from '@plone/types';
import { RecycleBinActions } from './RecycleBinActions';
import { RecycleBinActiveFilters } from './RecycleBinActiveFilters';
import { RecycleBinFilters } from './RecycleBinFilters';
import { RecycleBinTable } from './RecycleBinTable';
import { getPagination, type RecycleBinQueryState } from './utils';

export type RecycleBinActionData = {
  message?: string;
  failures?: Array<{ id: string; message: string }>;
};

export function RecycleBinListing({
  recycleBin,
  queryState,
  actionData,
}: {
  recycleBin: GetRecycleBinResponse;
  queryState: RecycleBinQueryState;
  actionData?: RecycleBinActionData;
}) {
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { start, end, size, previousStart, nextStart, hasPrevious, hasNext } =
    getPagination(
      recycleBin.items_total,
      queryState.b_start,
      queryState.b_size,
    );
  const hasActiveFilters = Object.entries(queryState).some(
    ([key, value]) => value && key !== 'b_start' && key !== 'b_size',
  );
  const makePageHref = (bStart: number) => {
    const searchParams = new URLSearchParams();
    Object.entries(queryState).forEach(([key, value]) => {
      if (value && key !== 'b_start') searchParams.set(key, value);
    });
    searchParams.set('b_start', String(bStart));
    searchParams.set('b_size', String(size));
    return `/@@recyclebin?${searchParams.toString()}`;
  };

  return (
    <section className="py-8">
      <div className="mb-6">
        <h1 className="documentFirstHeading">{t('cmsui.recyclebin.title')}</h1>
        <p className="max-w-3xl text-quanta-iron">
          {t('cmsui.recyclebin.description')}
        </p>
      </div>
      {actionData?.message ? (
        <div className="my-4 rounded border border-quanta-gold bg-quanta-cream p-3">
          <p>{actionData.message}</p>
          {actionData.failures?.length ? (
            <ul className="mt-2 list-disc pl-5">
              {actionData.failures.map((failure) => (
                <li key={failure.id}>
                  {failure.id}: {failure.message}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
      <RecycleBinFilters items={recycleBin.items} queryState={queryState} />
      <RecycleBinActiveFilters queryState={queryState} />
      <RecycleBinActions
        selectedItems={selectedItems}
        disabled={recycleBin.items_total === 0}
      />
      {recycleBin.items_total === 0 ? (
        <div className="my-8 rounded border border-quanta-smoke p-8 text-center">
          <h2 className="text-xl font-semibold">
            {hasActiveFilters
              ? t('cmsui.recyclebin.empty.noMatches')
              : t('cmsui.recyclebin.empty.noItems')}
          </h2>
          {hasActiveFilters ? (
            <Link to="/@@recyclebin" className="mt-3 inline-block underline">
              {t('cmsui.recyclebin.filters.clearAll')}
            </Link>
          ) : null}
        </div>
      ) : (
        <>
          <div className="mb-3 text-sm text-quanta-iron">
            {t('cmsui.recyclebin.pagination.range', {
              start,
              end,
              total: recycleBin.items_total,
            })}
          </div>
          <RecycleBinTable
            items={recycleBin.items}
            selectedItems={selectedItems}
            onSelectionChange={setSelectedItems}
          />
          <nav className="mt-4 flex gap-3" aria-label="Pagination">
            <Link
              to={makePageHref(previousStart)}
              aria-disabled={!hasPrevious}
              className={`
                rounded border px-3 py-2
                ${hasPrevious ? '' : 'pointer-events-none opacity-50'}
              `}
            >
              {t('cmsui.recyclebin.pagination.previous')}
            </Link>
            <Link
              to={makePageHref(nextStart)}
              aria-disabled={!hasNext}
              className={`
                rounded border px-3 py-2
                ${hasNext ? '' : 'pointer-events-none opacity-50'}
              `}
            >
              {t('cmsui.recyclebin.pagination.next')}
            </Link>
          </nav>
        </>
      )}
    </section>
  );
}
