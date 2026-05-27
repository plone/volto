import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { RecycleBinItemSummary } from '@plone/types';
import { formatRecycleBinDate } from './utils';

export function RecycleBinTable({
  items,
  selectedItems,
  onSelectionChange,
}: {
  items: RecycleBinItemSummary[];
  selectedItems: string[];
  onSelectionChange: (selectedItems: string[]) => void;
}) {
  const { t, i18n } = useTranslation();
  const allSelected =
    items.length > 0 &&
    items.every((item) => selectedItems.includes(item.recycle_id));

  const toggleItem = (id: string, selected: boolean) => {
    onSelectionChange(
      selected
        ? Array.from(new Set([...selectedItems, id]))
        : selectedItems.filter((itemId) => itemId !== id),
    );
  };

  return (
    <div className="overflow-x-auto border border-quanta-smoke">
      <table className="w-full min-w-[920px] border-collapse text-left text-sm">
        <thead className="bg-quanta-snow">
          <tr>
            <th className="w-12 px-3 py-2">
              <input
                aria-label={t('cmsui.recyclebin.table.selectAll')}
                type="checkbox"
                checked={allSelected}
                onChange={(event) =>
                  onSelectionChange(
                    event.target.checked
                      ? items.map((item) => item.recycle_id)
                      : [],
                  )
                }
              />
            </th>
            <th className="px-3 py-2">{t('cmsui.recyclebin.table.title')}</th>
            <th className="px-3 py-2">{t('cmsui.recyclebin.table.type')}</th>
            <th className="px-3 py-2">
              {t('cmsui.recyclebin.table.workflowState')}
            </th>
            <th className="px-3 py-2">{t('cmsui.recyclebin.table.path')}</th>
            <th className="px-3 py-2">
              {t('cmsui.recyclebin.table.deletionDate')}
            </th>
            <th className="px-3 py-2">
              {t('cmsui.recyclebin.table.deletedBy')}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.recycle_id} className="border-t border-quanta-smoke">
              <td className="px-3 py-2">
                <input
                  aria-label={t('cmsui.recyclebin.table.selectItem', {
                    title: item.title,
                  })}
                  name="selected_items"
                  type="checkbox"
                  value={item.recycle_id}
                  checked={selectedItems.includes(item.recycle_id)}
                  onChange={(event) =>
                    toggleItem(item.recycle_id, event.target.checked)
                  }
                />
              </td>
              <td className="px-3 py-2">
                <Link
                  to={`/@@recyclebin/${item.recycle_id}`}
                  className="font-medium text-brand underline"
                >
                  {item.title || item.id}
                </Link>
                {item.has_children ? (
                  <span
                    className={`
                      ml-2 rounded bg-quanta-daiquiri px-2 py-0.5 text-xs text-quanta-turtle
                    `}
                  >
                    {t('cmsui.recyclebin.table.hasChildren')}
                  </span>
                ) : null}
              </td>
              <td className="px-3 py-2">{item['@type']}</td>
              <td className="px-3 py-2">{item.review_state}</td>
              <td className="max-w-[260px] truncate px-3 py-2">{item.path}</td>
              <td className="px-3 py-2">
                {formatRecycleBinDate(item.deletion_date, i18n.language)}
              </td>
              <td className="px-3 py-2">{item.deleted_by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
