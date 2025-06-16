import React, { useEffect, useMemo, useState } from 'react';
import { DialogTrigger, Heading, type Key } from 'react-aria-components';
import { Dialog, Icon, Modal } from '@plone/components';
import { Button } from '@plone/components/tailwind';
import { atom } from 'jotai';
import {
  ObjectBrowserWidgetBody,
  type ObjectBrowserWidgetBodyProps,
} from './ObjectBrowserWidgetBody';
import { isImageMode, useStableFetcherData } from './utils';
import type { BaseFormFieldProps } from '../TextField/TextField';
import {
  Description,
  fieldBorderStyles,
  FieldError,
  Label,
} from '../Field/Field';
import { tv } from 'tailwind-variants';
import { focusRing } from '../utils';
import { useFetcher, useLoaderData } from 'react-router';
import type { loader } from '../../routes/objectBrowserWidget';
import type { loader as editLoader } from '../../routes/edit';
import {
  ObjectBrowserNavigationProvider,
  useObjectBrowserNavigation,
} from './ObjectBrowserNavigationContext';

export const obwAtom = atom(false);
const widgetStyles = tv({
  extend: focusRing,
  base: 'rounded-md',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

interface ObjectBrowserWidgetProps
  extends ObjectBrowserWidgetBodyProps,
    BaseFormFieldProps {
  title: string;
}
const METADATA_FIELDS = '?path.depth=1&metadata_fields:list=is_folderish';

export function ObjectBrowserWidgetComponent(props: ObjectBrowserWidgetProps) {
  const {
    mode,
    label,
    errorMessage,
    description,
    defaultValue,
    onChange,
    ...bodyProps
  } = props;
  const { content } = useLoaderData<typeof editLoader>();

  const fetcher = useFetcher<typeof loader>();
  const stableData = useStableFetcherData(fetcher);
  const { currentPath, navigateTo } = useObjectBrowserNavigation();
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(() => {
    if (defaultValue && defaultValue !== 'all') {
      return new Set(
        // @ts-ignore
        defaultValue.map((item: any) =>
          typeof item === 'string' ? item : item['@id'],
        ),
      );
    }
    return new Set();
  });

  const selectionBehavior = useMemo(
    () => (isImageMode(mode) ? 'replace' : 'toggle'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const selectionMode = useMemo(
    () => (isImageMode(mode) ? 'single' : 'multiple'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const handleSelectionChange = (keys: Set<Key>) => {
    setSelectedKeys(keys);

    // TODO: move it in useeffect maybe?
    const normalizedValues = Array.from(keys).map((id) => ({
      '@id': id,
    }));

    onChange(normalizedValues);
  };

  useEffect(() => {
    if (currentPath) {
      fetcher.load(`/@objectBrowserWidget${currentPath}${METADATA_FIELDS}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className={widgetStyles()}>
        {/* TODO: implement visible selection list with TagGroup */}
        <DialogTrigger
          isOpen={Boolean(currentPath)}
          onOpenChange={() => navigateTo(content['@id'])}
        >
          <Button aria-label="Settings" size="L" type="button">
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
          <Modal
            isDismissable
            className="data-[entering]:animate-slide-in data-[exiting]:animate-slide-out border-quanta-azure bg-quanta-air fixed top-0 right-0 bottom-0 w-[400px] border-l p-8 text-black shadow-[rgba(0,0,0,0.1)_-8px_0px_20px] outline-none"
          >
            <Dialog>
              <div className="flex items-center justify-between">
                <Heading slot="title">
                  {isImageMode(mode) ? 'Add image' : 'Choose target'}
                </Heading>
                <div className="flex items-center gap-0.5">
                  <Button
                    variant="neutral"
                    // eslint-disable-next-line no-console
                    onPress={() => console.log('I will search')}
                    type="button"
                  >
                    <Icon size="sm" className="text-quanta-azure">
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

                  <Button slot="close" variant="neutral" type="button">
                    X
                  </Button>
                </div>
              </div>
              <ObjectBrowserWidgetBody
                {...bodyProps}
                mode={mode}
                loading={fetcher.state === 'loading'}
                items={stableData?.results?.items}
                breadcrumbs={stableData?.breadcrumbs?.items}
                selectedItems={selectedKeys}
                selectionBehavior={selectionBehavior}
                selectionMode={selectionMode}
                onChange={handleSelectionChange}
              />
            </Dialog>
          </Modal>
        </DialogTrigger>
      </div>
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </div>
  );
}

export function ObjectBrowserWidget(props: ObjectBrowserWidgetProps) {
  return (
    <ObjectBrowserNavigationProvider>
      <ObjectBrowserWidgetComponent {...props} />
    </ObjectBrowserNavigationProvider>
  );
}
