import React from 'react';
import { useFetcher } from 'react-router';
import { Heading } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { Modal, Dialog } from '@plone/components';
import { Button } from '@plone/components/tailwind';
import CloseSVG from '@plone/components/icons/close.svg?react';
import BinSVG from '@plone/components/icons/bin.svg?react';
import { useContentsContext } from '../providers/contents';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  message?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({}) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const { showDelete, setShowDelete, itemsToDelete, setItemsToDelete } =
    useContentsContext();
  console.log('itemsToDelete', itemsToDelete, itemsToDelete.length);
  if (!showDelete) return null;

  const close = () => {
    setItemsToDelete(new Set());
    setShowDelete(false);
  };

  const submitDelete = () => {
    fetcher.submit(itemsToDelete, {
      method: 'post',
      encType: 'application/json',
    });
  };

  //TODO: check linkintegrity
  return (
    <Modal isDismissable isOpen={showDelete} onOpenChange={setShowDelete}>
      <Dialog>
        <Heading slot="title" className="react-aria-Heading text-center">
          {itemsToDelete.length > 1
            ? t('contents.modal_delete.multi.title', {
                n: itemsToDelete.length,
              })
            : t('contents.modal_delete.single.title', {
                item: [...itemsToDelete][0].title,
              })}
        </Heading>

        <p className="help text-center">
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
};

export default DeleteModal;
