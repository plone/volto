import React from 'react';
import { useFetcher, useLocation } from 'react-router';

import { Heading } from 'react-aria-components';
import { useTranslation } from 'react-i18next';
import { Modal, Dialog } from '@plone/components';
import { Button } from '@plone/components/tailwind';
import CloseSVG from '@plone/components/icons/close.svg?react';
import BinSVG from '@plone/components/icons/bin.svg?react';
import { useContentsContext } from '../../providers/contents';

interface DeleteModalProps {}

const DeleteModal: React.FC<DeleteModalProps> = ({}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const fetcher = useFetcher();
  const { showDelete, setShowDelete, itemsToDelete, setItemsToDelete } =
    useContentsContext();

  if (!showDelete) return null;

  const close = () => {
    setItemsToDelete(new Set());
    setShowDelete(false);
  };

  const submitDelete = () => {
    fetcher.submit(
      { items: [...itemsToDelete].map((i) => i['@id']) },
      {
        method: 'DELETE',
        encType: 'application/json',
        action: '/@@contents/@@delete',
      },
    );
    setShowDelete(false);
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
