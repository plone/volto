'use client';

import { Dialog, Heading } from 'react-aria-components';
import { Modal } from '@plone/components';
import { Button, Input } from '@plone/components/quanta';
import { SearchIcon, CloseIcon } from '@plone/components/Icons';
import { ObjectBrowserWidgetBody } from './ObjectBrowserWidgetBody';
import { useObjectBrowserContext } from './ObjectBrowserContext';
import { useTranslation } from 'react-i18next';

export const ObjectBrowserModal = () => {
  const { t } = useTranslation();
  const {
    open,
    setOpen,
    searchMode,
    setSearchMode,
    setSearchableText,
    handleSearchInputChange,
    ariaControlsId,
    title,
  } = useObjectBrowserContext();
  return (
    <Modal
      isDismissable
      className={`
        data-[entering]:animate-slide-in
        data-[exiting]:animate-slide-out
        fixed top-0 right-0 bottom-0 w-[360px] border-l border-quanta-azure bg-quanta-air px-6 py-8
        text-black shadow-[rgba(0,0,0,0.1)_-8px_0px_20px] outline-none
      `}
      isOpen={open}
      onOpenChange={(isOpen) => setOpen(isOpen)}
    >
      <Dialog className="flex h-full flex-col overflow-hidden p-1">
        {!searchMode ? (
          <div className="flex items-center justify-between">
            <Heading slot="title" className="!mb-0 !text-2xl">
              {title || t('cmsui.objectbrowserwidget.dialogTitle')}
            </Heading>
            <div className="flex items-center gap-0.5">
              <Button
                variant="icon"
                onPress={() => {
                  setSearchMode(true);
                  setSearchableText('');
                }}
                type="button"
                aria-label={t('cmsui.objectbrowserwidget.openSearch')}
              >
                <SearchIcon />
              </Button>

              <Button
                slot="close"
                variant="icon"
                type="button"
                aria-label={t('cmsui.objectbrowserwidget.closeDialog')}
                onPress={() => setOpen(false)}
              >
                <CloseIcon />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Input
              onChange={handleSearchInputChange}
              className={'border-quanta rounded-md'}
              aria-controls={ariaControlsId}
              placeholder={t('cmsui.objectbrowserwidget.searchPlaceholder')}
            />
            <Button
              variant="icon"
              type="button"
              aria-label={t('cmsui.objectbrowserwidget.closeSearch')}
              onPress={() => {
                setSearchMode(false);
                setSearchableText('');
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        )}
        <ObjectBrowserWidgetBody />
      </Dialog>
    </Modal>
  );
};

ObjectBrowserModal.displayName = 'ObjectBrowserModal';
