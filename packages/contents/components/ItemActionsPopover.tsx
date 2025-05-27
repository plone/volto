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
      dialogAriaLabel={t('contents.actions.actions')}
    >
      <ul className="popover-list">
        <li className="popover-list-item edit">
          <Link href={editLink}>
            <EditIcon />
            {t('contents.actions.edit')}
          </Link>
        </li>
        <li className="popover-list-item view">
          <Link href={viewLink}>
            <EyeIcon />
            {t('contents.actions.view')}
          </Link>
        </li>
        <li className="popover-list-item move-to-top">
          <Button onPress={onMoveToTop} className="react-aria-Link">
            <RowbeforeIcon />
            {t('contents.actions.move_to_top_folder')}
          </Button>
        </li>
        <li className="popover-list-item move-to-bottom">
          <Button onPress={onMoveToBottom} className="react-aria-Link">
            <RowafterIcon />
            {t('contents.actions.move_to_bottom_folder')}
          </Button>
        </li>
        <li className="popover-list-item cut">
          <Button onPress={onCut} className="react-aria-Link">
            <CutIcon />
            {t('contents.actions.cut')}
          </Button>
        </li>
        <li className="popover-list-item copy">
          <Button onPress={onCopy} className="react-aria-Link">
            <CopyIcon />
            {t('contents.actions.copy')}
          </Button>
        </li>
        <li className="popover-list-item delete">
          <Button onPress={onDelete} className="react-aria-Link">
            <BinIcon />
            {t('contents.actions.delete')}
          </Button>
        </li>
      </ul>
    </Popover>
  );
}
