import { Form } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@plone/components/quanta';

export function RecycleBinRestorePanel({
  actionMessage,
  defaultTargetPath,
}: {
  actionMessage?: string;
  defaultTargetPath: string;
}) {
  const { t } = useTranslation();

  return (
    <section className="mt-6 rounded border border-quanta-smoke p-4">
      <h2 className="mb-3 text-xl font-semibold">
        {t('cmsui.recyclebin.restorePanel.title')}
      </h2>
      {actionMessage ? (
        <p className="mb-3 rounded border border-quanta-gold bg-quanta-cream p-3">
          {actionMessage}
        </p>
      ) : null}
      <Form method="post" className="flex flex-wrap items-end gap-3">
        <label className="flex min-w-[260px] flex-1 flex-col gap-1 text-sm">
          {t('cmsui.recyclebin.restorePanel.targetPath')}
          <input
            name="target_path"
            defaultValue={defaultTargetPath}
            className="rounded border border-quanta-silver px-3 py-2"
          />
        </label>
        <Button
          type="submit"
          name="_action"
          value="restore"
          variant="primary"
          accent
        >
          {t('cmsui.recyclebin.actions.restore')}
        </Button>
        <Button
          type="submit"
          name="_action"
          value="purge"
          variant="destructive"
          accent
          onClick={(event) => {
            // eslint-disable-next-line no-alert
            if (!window.confirm(t('cmsui.recyclebin.confirmations.delete'))) {
              event.preventDefault();
            }
          }}
        >
          {t('cmsui.recyclebin.actions.delete')}
        </Button>
      </Form>
    </section>
  );
}
