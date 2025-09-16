import { useEffect } from 'react';
import { useFetcher } from 'react-router';
import { Heading } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { Modal, Dialog } from '@plone/components';
import { Button } from '@plone/components/quanta';
import { BinIcon } from '@plone/components/Icons';
import CloseSVG from '@plone/components/icons/close.svg?react';
import BinSVG from '@plone/components/icons/bin.svg?react';
import { type ToastItem } from '@plone/layout/config/toast';
import { useContentsContext } from '../../providers/contents';

export default function DeleteModal() {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const {
    showDelete,
    setShowDelete,
    itemsToDelete,
    setItemsToDelete,
    setSelected,
    showToast,
  } = useContentsContext();

  useEffect(() => {
    if (fetcher.state === 'submitting' || fetcher.state == 'loading') {
      // TODO: handle loading state, show something like a dimmer while operation is in progress
    } else if (fetcher.state == 'idle') {
      // La richiesta è terminata.
      const data = fetcher.data;

      if (data?.ok?.length > 0) {
        const toast: ToastItem = { title: '', icon: <BinIcon /> };
        if (data.ok.length === 1) {
          toast.title = t('contents.actions.deleted', {
            title: data.ok[0].title,
          });
        } else {
          toast.title = t('contents.actions.deleted_multiple', {
            number: data.ok.length,
          });
        }

        showToast(toast);
      }
      if (data?.errors?.length > 0) {
        data.errors.forEach((e) => {
          const toast: ToastItem = {
            title: `${t('contents.error')} ${e.__error.status} - ${e.__error.data.type}`,
            description: e.__error.data?.message,
            icon: <BinIcon />,
            className: 'error',
          };
          showToast(toast);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.state]);

  if (!showDelete) return null;

  const close = () => {
    setItemsToDelete(new Set());
    setSelected('none');
    setShowDelete(false);
  };

  const submitDelete = async () => {
    const items: any[] = [...itemsToDelete];
    await fetcher.submit(
      {
        action: 'delete',
        paths: [...itemsToDelete].map((i) => i['@id']),
        items,
      },
      {
        method: 'DELETE',
        encType: 'application/json',
        action: '/@@contents/@@delete',
      },
    );
    close();
  };

  //TODO: check linkintegrity
  return (
    <Modal isDismissable isOpen={showDelete} onOpenChange={setShowDelete}>
      <Dialog>
        <Heading slot="title" className="react-aria-Heading text-center">
          {itemsToDelete.size > 1
            ? t('contents.modal_delete.multi.title', {
                n: itemsToDelete.size,
              })
            : t('contents.modal_delete.single.title', {
                item: [...itemsToDelete][0].title,
              })}
        </Heading>

        <p className="text-center text-[0.8rem] font-light">
          {t('contents.modal_delete.description')}
        </p>
        <div className="button-group-bottom justify-center">
          <Button
            className="react-aria-Button close"
            onPress={close}
            aria-label={t('contents.modal.close')}
            accent={true}
            size="L"
          >
            <CloseSVG />
          </Button>
          <Button
            className="react-aria-Button delete"
            onPress={submitDelete}
            aria-label={t('contents.modal_delete.confirm')}
            variant="destructive"
            accent={true}
            size="L"
          >
            <BinSVG />
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
}
