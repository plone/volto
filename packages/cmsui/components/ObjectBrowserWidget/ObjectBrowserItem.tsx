import React from 'react';
import { GridListItem, Button } from '@plone/components/quanta';
import { CheckboxIcon, ChevronrightIcon } from '@plone/components/Icons';
import { flattenToAppURL } from '@plone/helpers';
import { useTranslation } from 'react-i18next';
import { getItemLabel, getContentIcon } from './utils';
import type { Brain } from '@plone/types';
import { tv } from 'tailwind-variants';

export const itemVariants = tv({
  base: 'group',
  variants: {
    viewMode: {
      list: 'data-[selectable=false]:bg-quanta-silver data-[selectable=false]:text-iron border-l-4 data-[selectable=false]:cursor-not-allowed',
      grid: 'pb-2 hover:cursor-pointer hover:bg-transparent',
    },
    workflow: {
      private: '',
      published: '',
      pending: '',
    },
  },
  compoundVariants: [
    // List view with workflow border colors
    {
      viewMode: 'list',
      workflow: 'private',
      class: 'border-l-red-500',
    },
    {
      viewMode: 'list',
      workflow: 'published',
      class: 'border-l-blue-500',
    },
    {
      viewMode: 'list',
      workflow: 'pending',
      class: 'border-l-yellow-500',
    },
  ],
});

export interface ObjectBrowserItemProps {
  item: Brain;
  onNavigate: (item: Brain) => void;
  viewMode: boolean;
}

export function ObjectBrowserItem({
  item,
  viewMode,
  onNavigate,
}: ObjectBrowserItemProps) {
  const { t } = useTranslation();
  const ContentIcon = getContentIcon(
    item['@type'] || item.portal_type || 'Document',
    item.is_folderish || false,
  );

  return viewMode ? (
    // Grid view - no workflow border, content icon
    <div className="relative flex w-36 flex-1 flex-col items-center gap-2 p-0">
      <div
        className={`
          absolute top-2 left-2 hidden rounded-full border border-solid border-white bg-white
          leading-0 text-quanta-sapphire
          group-selected:block
        `}
      >
        <CheckboxIcon className="h-6 w-6" />
      </div>
      <div
        className={`
          flex min-h-36 min-w-36 flex-col items-center justify-center rounded-md bg-quanta-snow
          text-center
        `}
      >
        {item.image_field && item.image_scales ? (
          <img
            className="h-full w-full rounded-md object-contain"
            src={flattenToAppURL(
              `${item['@id']}/${item.image_scales.image[0].scales.preview?.download}`,
            )}
            alt={item.title || ''}
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center text-quanta-pigeon">
            <ContentIcon size="xl" />
          </div>
        )}
      </div>
      <span className="text-center text-sm leading-tight font-medium text-quanta-cobalt">
        {item.title}
      </span>
    </div>
  ) : (
    // List view - with workflow border color and icons
    <div
      className={`
        flex h-full w-full items-center text-quanta-cobalt
        group-data-[selectable=false]:text-quanta-iron
      `}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <ContentIcon size="sm" className="text-quanta-pigeon" />
        <span className="truncate font-medium">{item.title}</span>
      </div>

      {/* Fixed width column for consistent arrow alignment */}
      <div className="flex w-8 flex-shrink-0 justify-center">
        {item.is_folderish && (
          <Button
            variant="icon"
            type="button"
            aria-label={t('cmsui.objectbrowserwidget.itemNavigateTo', {
              title: item.title,
            })}
            className="rounded-none border-none bg-transparent"
            onPress={() => onNavigate(item)}
          >
            <ChevronrightIcon size="sm" />
          </Button>
        )}
      </div>
    </div>
  );
}
