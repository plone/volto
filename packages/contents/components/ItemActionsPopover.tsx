import React from 'react';
import {
  Link,
  Button,
  type PopoverProps,
  EditIcon,
  EyeIcon,
  RowbeforeIcon,
  RowafterIcon,
  CutIcon,
  CopyIcon,
  BinIcon,
  Popover,
} from '@plone/components';
import { useContentsContext } from '../providers/contents';

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
  const { intl } = useContentsContext();

  return (
    <Popover
      {...popoverProps}
      className="react-aria-Popover item-actions-popover scroll"
      dialogAriaLabel={intl.formatMessage({ id: 'Actions' })}
    >
      <ul className="item-actions-list">
        <li className="item-actions-list-item edit">
          <Link href={editLink}>
            <EditIcon />
            {intl.formatMessage({ id: 'Edit' })}
          </Link>
        </li>
        <li className="item-actions-list-item view">
          <Link href={viewLink}>
            <EyeIcon />
            {intl.formatMessage({ id: 'View' })}
          </Link>
        </li>
        <li className="item-actions-list-item move-to-top">
          <Button onPress={onMoveToTop} className="react-aria-Link">
            <RowbeforeIcon />
            {intl.formatMessage({ id: 'Move to top of folder' })}
          </Button>
        </li>
        <li className="item-actions-list-item move-to-bottom">
          <Button onPress={onMoveToBottom} className="react-aria-Link">
            <RowafterIcon />
            {intl.formatMessage({ id: 'Move to bottom of folder' })}
          </Button>
        </li>
        <li className="item-actions-list-item cut">
          <Button onPress={onCut} className="react-aria-Link">
            <CutIcon />
            {intl.formatMessage({ id: 'Cut' })}
          </Button>
        </li>
        <li className="item-actions-list-item copy">
          <Button onPress={onCopy} className="react-aria-Link">
            <CopyIcon />
            {intl.formatMessage({ id: 'Copy' })}
          </Button>
        </li>
        <li className="item-actions-list-item delete">
          <Button onPress={onDelete} className="react-aria-Link">
            <BinIcon />
            {intl.formatMessage({ id: 'Delete' })}
          </Button>
        </li>
      </ul>
    </Popover>
  );
}
