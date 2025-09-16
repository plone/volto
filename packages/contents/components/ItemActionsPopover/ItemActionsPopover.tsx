import { Link, Button, type PopoverProps, Popover } from '@plone/components';
import EditIcon from '@plone/components/icons/edit.svg?react';
import EyeIcon from '@plone/components/icons/eye.svg?react';
import RowbeforeIcon from '@plone/components/icons/row-before.svg?react';
import RowafterIcon from '@plone/components/icons/row-after.svg?react';
import CutIcon from '@plone/components/icons/cut.svg?react';
import CopyIcon from '@plone/components/icons/copy.svg?react';
import BinIcon from '@plone/components/icons/bin.svg?react';
import { useTranslation } from 'react-i18next';
import PopoverListItem from '../PopoverListItem';
import './ItemActionsPopover.css';

interface Props extends Omit<PopoverProps, 'children'> {
  editLink: string;
  viewLink: string;
  onMoveToTop: () => Promise<void>;
  onMoveToBottom: () => Promise<void>;
  onCut: () => void;
  onCopy: () => void;
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
      className="q react-aria-Popover item-actions-popover"
      dialogAriaLabel={t('contents.actions.actions')}
    >
      <ul className="popover-list">
        <PopoverListItem className="edit">
          <Link href={editLink}>
            <EditIcon />
            {t('contents.actions.edit')}
          </Link>
        </PopoverListItem>

        <PopoverListItem className="view">
          <Link href={viewLink}>
            <EyeIcon />
            {t('contents.actions.view')}
          </Link>
        </PopoverListItem>
        <PopoverListItem className="move-to-top">
          <Button onPress={onMoveToTop} className="react-aria-Link">
            <RowbeforeIcon />
            {t('contents.actions.move_to_top_folder')}
          </Button>
        </PopoverListItem>

        <PopoverListItem className="move-to-bottom">
          <Button onPress={onMoveToBottom} className="react-aria-Link">
            <RowafterIcon />
            {t('contents.actions.move_to_bottom_folder')}
          </Button>
        </PopoverListItem>
        <PopoverListItem className="cut">
          <Button onPress={onCut} className="react-aria-Link">
            <CutIcon />
            {t('contents.actions.cut')}
          </Button>
        </PopoverListItem>
        <PopoverListItem className="copy">
          <Button onPress={onCopy} className="react-aria-Link">
            <CopyIcon />
            {t('contents.actions.copy')}
          </Button>
        </PopoverListItem>
        <PopoverListItem className="delete">
          <Button onPress={onDelete} className="react-aria-Link">
            <BinIcon />
            {t('contents.actions.delete')}
          </Button>
        </PopoverListItem>
      </ul>
    </Popover>
  );
}
