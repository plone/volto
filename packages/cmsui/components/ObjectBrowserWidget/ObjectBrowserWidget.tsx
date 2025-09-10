import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DialogTrigger,
  Heading,
  type Key,
  type Selection,
} from 'react-aria-components';
import { Dialog, Icon, Modal } from '@plone/components';
import { Button, Input, Tag, TagGroup } from '@plone/components/quanta';
import { atom } from 'jotai';
import {
  ObjectBrowserWidgetBody,
  type ObjectBrowserWidgetBodyProps,
} from './ObjectBrowserWidgetBody';
import {
  isImageMode,
  useAccumulatedItems,
  isAll,
  buildObjectBrowserUrl,
  processSelection,
  initializeSelectedKeys,
} from './utils';
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
import type { Brain } from '@plone/types';
import { CloseIcon, SearchIcon } from '@plone/components/Icons';
import { useDebounceValue } from 'usehooks-ts';

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
  defaultValue?: string[] | 'all';
  onChange: (value: any) => void;
}
// TODO: guarda selected_attrs dal teaser: sono configurabili e devi quantomeno passare il brain o la def dei selectedAttrs
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
  const [open, setOpen] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const fetcher = useFetcher<typeof loader>();
  const knownItems = useAccumulatedItems(fetcher, 'results');
  const { currentPath, navigateTo } = useObjectBrowserNavigation();
  const [SearchableText, setSearchableText] = useDebounceValue<string>('', 350);
  const [selectedKeys, setSelectedKeys] = useState<
    Set<{ id: string; title: string }>
  >(() => initializeSelectedKeys(defaultValue));
  // TODO: WTF gives me mode?
  const selectionBehavior = useMemo(
    () => (isImageMode(mode) ? 'replace' : 'toggle'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  // TODO: WTF gives me mode?
  const selectionMode = useMemo(
    () => (isImageMode(mode) ? 'single' : 'multiple'),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  const handleSelectionChange = (keys: Selection) => {
    const items = knownItems ?? [];
    const selected = processSelection(keys, items);

    const newSelectedKeys = new Set(
      selected.map((item) => ({ id: item['@id'], title: item.title })),
    );
    setSelectedKeys(newSelectedKeys);
    onChange(
      Array.from(newSelectedKeys).map(({ id, title }) => ({
        '@id': id,
        title,
      })),
    );
  };
  const handleRemove = (keys: Set<Key>) => {
    const keysToRemove = new Set(keys);
    const newSelected = Array.from(selectedKeys).filter(
      (item) => !keysToRemove.has(item.id),
    );
    setSelectedKeys(new Set(newSelected));
    onChange(
      newSelected.map(({ id, title }) => ({
        '@id': id,
        title,
      })),
    );
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchableText(value);
  };

  async function loadData(currentPath?: string, SearchableText?: string) {
    const url = buildObjectBrowserUrl(currentPath, SearchableText);
    if (!url) return;
    await fetcher.load(url);
  }

  useEffect(() => {
    loadData(currentPath, SearchableText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath, SearchableText]);

  const items = useMemo(
    () => fetcher?.data?.results?.items ?? [],
    [fetcher.data],
  );
  const breadcrumbs = useMemo(
    () => fetcher?.data?.breadcrumbs?.items ?? [],
    [fetcher.data],
  );

  console.log('cacca', items);
  // Flickering in search mode, how to address it? Wait for this to be released (fetcher resetting)?
  // https://github.com/remix-run/react-router/pull/14206/files
  // Resetting a fetcher seems to be a basic missing feature, this is a usecase
  const loading =
    fetcher.state === 'loading' || (fetcher.state === 'idle' && !fetcher.data);
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className={widgetStyles()}>
        <TagGroup
          selectedKeys={Array.from(selectedKeys).map((item) => item.id)}
          className="gap-4"
          items={Array.from(selectedKeys).map(({ id, title }) => ({
            id,
            title,
          }))}
          // @ts-ignore prop is present in react-aria but not in types somehow
          escapeKeyBehavior="none"
          onRemove={(keys) => {
            handleRemove(keys);
          }}
        >
          {(item) => (
            <Tag id={item.id} key={item.id} className="text-md">
              {item.title}
            </Tag>
          )}
        </TagGroup>
        <DialogTrigger
          isOpen={open}
          onOpenChange={(isOpen) => {
            navigateTo(content['@id']);
            setOpen(isOpen);
          }}
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
            <Dialog className="flex h-full flex-col overflow-hidden">
              {!searchMode ? (
                <div className="flex items-center justify-between">
                  <Heading slot="title">
                    {isImageMode(mode) ? 'Add image' : 'Choose target'}
                  </Heading>
                  <div className="flex items-center gap-0.5">
                    <Button
                      variant="neutral"
                      // eslint-disable-next-line no-console
                      onPress={() => setSearchMode(!searchMode)}
                      type="button"
                    >
                      <SearchIcon />
                    </Button>

                    <Button
                      slot="close"
                      variant="neutral"
                      type="button"
                      aria-label={'Close dialog'}
                      onPress={() => setOpen(false)}
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <Input onChange={handleSearchInputChange} />
                  <Button
                    slot="close"
                    variant="neutral"
                    type="button"
                    aria-label={'Close search'}
                    onPress={() => setSearchMode(false)}
                  >
                    <CloseIcon />
                  </Button>
                </div>
              )}
              <div>
                <ObjectBrowserWidgetBody
                  {...bodyProps}
                  mode={mode}
                  loading={loading}
                  items={items}
                  breadcrumbs={breadcrumbs}
                  selectedItems={Array.from(selectedKeys).map(
                    (item) => item.id,
                  )}
                  handleSelectionChange={handleSelectionChange}
                  selectionBehavior={selectionBehavior}
                  selectionMode={selectionMode}
                  searchMode={searchMode}
                />
              </div>
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
  const { content } = useLoaderData<typeof editLoader>();
  return (
    <ObjectBrowserNavigationProvider initialPath={content?.['@id']}>
      <ObjectBrowserWidgetComponent {...props} />
    </ObjectBrowserNavigationProvider>
  );
}
