// Componente per il caso "solo bottone + modal" senza tags
import React from 'react';
import { DialogTrigger } from 'react-aria-components';
import {
  useObjectBrowser,
  type UseObjectBrowserConfig,
} from './ObjectBrowserContext';
import { ObjectBrowserTrigger } from './ObjectBrowserTrigger';
import { ObjectBrowserModal } from './ObjectBrowserModal';

interface ObjectBrowserPickerProps extends UseObjectBrowserConfig {
  className?: string;
}

export const ObjectBrowserPicker = ({
  className,
  ...config
}: ObjectBrowserPickerProps) => {
  const {
    // State dal hook
    open,
    setOpen,
  } = useObjectBrowser(config);

  return (
    <div className={className}>
      <DialogTrigger isOpen={open} onOpenChange={setOpen}>
        <ObjectBrowserTrigger />
        <ObjectBrowserModal />
      </DialogTrigger>
    </div>
  );
};
