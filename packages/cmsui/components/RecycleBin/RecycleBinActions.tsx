import { Form } from 'react-router';
import { useTranslation } from 'react-i18next';

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
        <button
          type="submit"
          name="_action"
          value="restore-selected"
          disabled={noSelection}
          className={`
            rounded border border-quanta-silver px-4 py-2
            disabled:opacity-50
          `}
        >
          {t('cmsui.recyclebin.actions.restoreSelected')}
        </button>
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
        <button
          type="submit"
          name="_action"
          value="purge-selected"
          disabled={noSelection}
          className={`
            rounded border border-quanta-candy px-4 py-2 text-quanta-candy
            disabled:opacity-50
          `}
        >
          {t('cmsui.recyclebin.actions.deleteSelected')}
        </button>
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
        <button
          type="submit"
          name="_action"
          value="empty"
          disabled={disabled}
          className={`
            rounded bg-quanta-candy px-4 py-2 text-white
            disabled:opacity-50
          `}
        >
          {t('cmsui.recyclebin.actions.empty')}
        </button>
      </Form>
    </div>
  );
}
