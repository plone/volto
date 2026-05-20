// Componente Button estratto dal widget originale
import { type PropsWithChildren } from 'react';
import { Icon } from '@plone/components';
import { Button } from '@plone/components/quanta';
import { useObjectBrowserContext } from './ObjectBrowserContext';
import { DialogTrigger } from 'react-aria-components';
import { useTranslation } from 'react-i18next';

export const ObjectBrowserTrigger = ({ children }: PropsWithChildren) => {
  const { setOpen, open } = useObjectBrowserContext();
  const { t } = useTranslation();
  return (
    <DialogTrigger
      isOpen={open}
      onOpenChange={(isOpen) => {
        // navigateTo(content['@id']);
        setOpen(isOpen);
      }}
    >
      <Button
        aria-label={t('cmsui.objectbrowserwidget.openDialog')}
        size="L"
        type="button"
        variant="icon"
      >
        <Icon size="sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C10.8954 2 10 2.89543 10 4 10 5.10457 10.8954 6 12 6 13.1046 6 14 5.10457 14 4 14 2.89543 13.1046 2 12 2ZM4 16C2.89543 16 2 16.8954 2 18 2 19.1046 2.89543 20 4 20 5.10457 20 6 19.1046 6 18 6 16.8954 5.10457 16 4 16ZM10 18C10 16.8954 10.8954 16 12 16 13.1046 16 14 16.8954 14 18 14 19.1046 13.1046 20 12 20 10.8954 20 10 19.1046 10 18ZM20 16C18.8954 16 18 16.8954 18 18 18 19.1046 18.8954 20 20 20 21.1046 20 22 19.1046 22 18 22 16.8954 21.1046 16 20 16ZM13 10H21V14H19V12H13V14H11V12H5V14H3V10H11V8H13V10Z" />
          </svg>
        </Icon>
      </Button>
      {children}
    </DialogTrigger>
  );
};
ObjectBrowserTrigger.displayName = 'ObjectBrowserTrigger';
