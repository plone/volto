import { Form } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from '@plone/components/quanta';

export function RecycleBinActions({
  selectedItems,
  disabled,
}: {
  selectedItems: string[];
  disabled?: boolean;
}) {
  const { t } = useTranslation();
  const noSelection = selectedItems.length === 0 || disabled;

  return (
    <div className="my-4 flex flex-wrap gap-2">
      <Form method="post">
        {selectedItems.map((id) => (
          <input key={id} name="selected_items" type="hidden" value={id} />
        ))}
        <Button
          type="submit"
          name="_action"
          value="restore-selected"
          isDisabled={noSelection}
          variant="neutral"
          accent
        >
          {t('cmsui.recyclebin.actions.restoreSelected')}
        </Button>
      </Form>
      <Form
        method="post"
        onSubmit={(event) => {
          if (
            // eslint-disable-next-line no-alert
            !window.confirm(t('cmsui.recyclebin.confirmations.deleteSelected'))
          ) {
            event.preventDefault();
          }
        }}
      >
        {selectedItems.map((id) => (
          <input key={id} name="selected_items" type="hidden" value={id} />
        ))}
        <Button
          type="submit"
          name="_action"
          value="purge-selected"
          isDisabled={noSelection}
          variant="destructive"
        >
          {t('cmsui.recyclebin.actions.deleteSelected')}
        </Button>
      </Form>
      <Form
        method="post"
        onSubmit={(event) => {
          // eslint-disable-next-line no-alert
          if (!window.confirm(t('cmsui.recyclebin.confirmations.empty'))) {
            event.preventDefault();
          }
        }}
      >
        <Button
          type="submit"
          name="_action"
          value="empty"
          isDisabled={disabled}
          variant="destructive"
          accent
        >
          {t('cmsui.recyclebin.actions.empty')}
        </Button>
      </Form>
    </div>
  );
}
