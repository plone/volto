import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { GetRecycleBinItemResponse } from '@plone/types';
import { RecycleBinChildrenTable } from './RecycleBinChildrenTable';
import { RecycleBinRestorePanel } from './RecycleBinRestorePanel';
import { formatRecycleBinDate } from './utils';

export function RecycleBinItemDetails({
  item,
  actionMessage,
}: {
  item: GetRecycleBinItemResponse;
  actionMessage?: string;
}) {
  const { t, i18n } = useTranslation();

  return (
    <section className="py-8">
      <Link
        to="/@@recyclebin"
        className="mb-4 inline-block text-brand underline"
      >
        {t('cmsui.recyclebin.actions.backToListing')}
      </Link>
      <div className="mb-6">
        <h1 className="documentFirstHeading">{item.title || item.id}</h1>
        <span className="rounded bg-quanta-snow px-2 py-1 text-sm">
          {item['@type']}
        </span>
      </div>
      <dl
        className={`
          grid gap-3 border-y border-quanta-smoke py-4
          md:grid-cols-2
        `}
      >
        <div>
          <dt className="text-sm text-quanta-iron">
            {t('cmsui.recyclebin.details.originalId')}
          </dt>
          <dd>{item.id}</dd>
        </div>
        <div>
          <dt className="text-sm text-quanta-iron">
            {t('cmsui.recyclebin.details.workflowState')}
          </dt>
          <dd>{item.review_state}</dd>
        </div>
        <div>
          <dt className="text-sm text-quanta-iron">
            {t('cmsui.recyclebin.details.path')}
          </dt>
          <dd>{item.path}</dd>
        </div>
        <div>
          <dt className="text-sm text-quanta-iron">
            {t('cmsui.recyclebin.details.parentPath')}
          </dt>
          <dd>{item.parent_path}</dd>
        </div>
        <div>
          <dt className="text-sm text-quanta-iron">
            {t('cmsui.recyclebin.details.deletionDate')}
          </dt>
          <dd>{formatRecycleBinDate(item.deletion_date, i18n.language)}</dd>
        </div>
        <div>
          <dt className="text-sm text-quanta-iron">
            {t('cmsui.recyclebin.details.deletedBy')}
          </dt>
          <dd>{item.deleted_by}</dd>
        </div>
        <div>
          <dt className="text-sm text-quanta-iron">
            {t('cmsui.recyclebin.details.containedItems')}
          </dt>
          <dd>{item.items_total}</dd>
        </div>
      </dl>
      <RecycleBinRestorePanel actionMessage={actionMessage} />
      <RecycleBinChildrenTable childrenItems={item.items} />
    </section>
  );
}
