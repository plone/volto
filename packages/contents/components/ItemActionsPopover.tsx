import React from 'react';
import { Link, Button, type PopoverProps, Popover } from '@plone/components';
import EditIcon from '@plone/components/icons/edit.svg?react';
import EyeIcon from '@plone/components/icons/eye.svg?react';
import RowbeforeIcon from '@plone/components/icons/row-before.svg?react';
import RowafterIcon from '@plone/components/icons/row-after.svg?react';
import CutIcon from '@plone/components/icons/cut.svg?react';
import CopyIcon from '@plone/components/icons/copy.svg?react';
import BinIcon from '@plone/components/icons/bin.svg?react';
import { useTranslation } from 'react-i18next';

interface Props extends Omit<PopoverProps, 'children'> {
  editLink: string;
  viewLink: string;
  onMoveToTop: () => Promise<void>;
  onMoveToBottom: () => Promise<void>;
  onCut: () => Promise<void>;
  onCopy: () => Promise<void>;
  onDelete: () => Promise<void>;
}

export function ItemActionsPopover({
  editLink,
  viewLink,
  onMoveToTop,
  onMoveToBottom,
  onCut,
  onCopy,
  onDelete,
  ...popoverProps
}: Props) {
  const { t } = useTranslation();

  return (
    <Popover
      {...popoverProps}
      className="react-aria-Popover item-actions-popover"
      dialogAriaLabel={t('Actions')}
    >
      <ul className="item-actions-list">
        <li className="item-actions-list-item edit">
          <Link href={editLink}>
            <EditIcon />
            {t('Edit')}
          </Link>
        </li>
        <li className="item-actions-list-item view">
          <Link href={viewLink}>
            <EyeIcon />
            {t('View')}
          </Link>
        </li>
        <li className="item-actions-list-item move-to-top">
          <Button onPress={onMoveToTop} className="react-aria-Link">
            <RowbeforeIcon />
            {t('Move to top of folder')}
          </Button>
        </li>
        <li className="item-actions-list-item move-to-bottom">
          <Button onPress={onMoveToBottom} className="react-aria-Link">
            <RowafterIcon />
            {t('Move to bottom of folder')}
          </Button>
        </li>
        <li className="item-actions-list-item cut">
          <Button onPress={onCut} className="react-aria-Link">
            <CutIcon />
            {t('Cut')}
          </Button>
        </li>
        <li className="item-actions-list-item copy">
          <Button onPress={onCopy} className="react-aria-Link">
            <CopyIcon />
            {t('Copy')}
          </Button>
        </li>
        <li className="item-actions-list-item delete">
          <Button onPress={onDelete} className="react-aria-Link">
            <BinIcon />
            {t('Delete')}
          </Button>
        </li>
      </ul>
    </Popover>
  );
}
