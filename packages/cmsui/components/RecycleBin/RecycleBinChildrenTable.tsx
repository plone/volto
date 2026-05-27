import { Form } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@plone/components/quanta';
import type { RecycleBinChildItem } from '@plone/types';

export function RecycleBinChildrenTable({
  childrenItems,
  itemsTotal,
}: {
  childrenItems: RecycleBinChildItem[];
  itemsTotal: number;
}) {
  const { t } = useTranslation();

  if (childrenItems.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-semibold">
        {t('cmsui.recyclebin.children.title')} ({itemsTotal})
      </h2>
      <div className="overflow-x-auto border border-quanta-smoke">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-quanta-snow">
            <tr>
              <th className="px-3 py-2">{t('cmsui.recyclebin.table.title')}</th>
              <th className="px-3 py-2">{t('cmsui.recyclebin.table.type')}</th>
              <th className="px-3 py-2">
                {t('cmsui.recyclebin.table.workflowState')}
              </th>
              <th className="px-3 py-2">{t('cmsui.recyclebin.table.path')}</th>
              <th className="px-3 py-2">
                {t('cmsui.recyclebin.children.childrenCount')}
              </th>
              <th className="px-3 py-2">
                {t('cmsui.recyclebin.children.restoreTo')}
              </th>
            </tr>
          </thead>
          <tbody>
            {childrenItems.map((item) => (
              <tr
                key={item.restore_id}
                className="border-t border-quanta-smoke"
              >
                <td className="px-3 py-2">{item.title || item.id}</td>
                <td className="px-3 py-2">{item['@type']}</td>
                <td className="px-3 py-2">{item.review_state}</td>
                <td className="max-w-[260px] truncate px-3 py-2">
                  {item.path}
                </td>
                <td className="px-3 py-2">{item.children_count ?? ''}</td>
                <td className="px-3 py-2">
                  <Form method="post" className="flex min-w-[260px] gap-2">
                    <input
                      name="restore_id"
                      type="hidden"
                      value={item.restore_id}
                    />
                    <input
                      aria-label={t('cmsui.recyclebin.children.targetPath', {
                        title: item.title,
                      })}
                      name="target_path"
                      required
                      className="min-w-0 flex-1 rounded border border-quanta-silver px-2 py-1"
                    />
                    <Button
                      type="submit"
                      name="_action"
                      value="restore-child"
                      size="S"
                    >
                      {t('cmsui.recyclebin.actions.restore')}
                    </Button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
