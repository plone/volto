import { useFetcher } from 'react-router';
import { Heading } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { Modal, Dialog } from '@plone/components';
import { Button } from '@plone/components/quanta';
import CloseSVG from '@plone/components/icons/close.svg?react';
import BinSVG from '@plone/components/icons/bin.svg?react';
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
  } = useContentsContext();

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
