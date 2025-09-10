import { type ComponentProps, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDateFormatter } from 'react-aria';
import { getContentIcon } from '@plone/helpers';
import type { Brain } from '@plone/types';
import { Link, Button } from '@plone/components/quanta';
import MoreOptionsSVG from '@plone/components/icons/more-options.svg?react';
import { ItemActionsPopover } from '../ItemActionsPopover/ItemActionsPopover';
import ReviewState from '../ReviewState';

interface Props {
  item: Brain;
  column: keyof Brain | '_actions';
  indexes: {
    order: string[];
    values: {
      [index: string]: {
        type: string;
        label: string;
        selected: boolean;
        sort_on?: string;
      };
    };
  };
  onMoveToTop: ComponentProps<typeof ItemActionsPopover>['onMoveToTop'];
  onMoveToBottom: ComponentProps<typeof ItemActionsPopover>['onMoveToBottom'];
  onCut: ComponentProps<typeof ItemActionsPopover>['onCut'];
  onCopy: ComponentProps<typeof ItemActionsPopover>['onCopy'];
  onDelete: ComponentProps<typeof ItemActionsPopover>['onDelete'];
}

export function ContentsCell({
  item,
  column,
  indexes,
  onMoveToTop,
  onMoveToBottom,
  onCut,
  onCopy,
  onDelete,
}: Props) {
  const { t } = useTranslation();
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const longFormatter = useDateFormatter({
    dateStyle: 'full',
    timeStyle: 'full',
  });
  const shortFormatter = useDateFormatter({
    dateStyle: 'short',
    timeStyle: 'short',
  });
  const Icon = getContentIcon(item['@type'], item.is_folderish);

  if (column === 'title') {
    return (
      <Link
        className="title-link"
        href={`${item.is_folderish ? '/@@contents' : ''}${item['@id']}`}
      >
        <Icon size="S" title={item['Type'] || item['@type']} />
        {item.title}
        {item.ExpirationDate !== 'None' &&
          new Date(item.ExpirationDate).getTime() < new Date().getTime() && (
            <span className="expired">{t('contents.item.expired')}</span>
          )}
        {item.EffectiveDate !== 'None' &&
          new Date(item.EffectiveDate).getTime() > new Date().getTime() && (
            <span className="future">{t('contents.item.scheduled')}</span>
          )}
      </Link>
    );
  } else if (column === '_actions') {
    return (
      <>
        <Button
          variant="icon"
          className="item-actions-trigger"
          aria-label={t('contents.item.more_options')}
          onPress={() => setIsMoreOptionsOpen(true)}
          ref={triggerRef}
        >
          <MoreOptionsSVG />
        </Button>
        <ItemActionsPopover
          triggerRef={triggerRef}
          isOpen={isMoreOptionsOpen}
          onOpenChange={setIsMoreOptionsOpen}
          editLink={`/@@edit${item['@id']}`}
          viewLink={item['@id']}
          onMoveToBottom={async () => {
            const res = await onMoveToBottom();
            setIsMoreOptionsOpen(false);
            return res;
          }}
          onMoveToTop={async () => {
            const res = await onMoveToTop();
            setIsMoreOptionsOpen(false);
            return res;
          }}
          onCopy={async () => {
            const res = await onCopy();
            setIsMoreOptionsOpen(false);
            return res;
          }}
          onCut={async () => {
            const res = await onCut();
            setIsMoreOptionsOpen(false);
            return res;
          }}
          onDelete={async () => {
            const res = await onDelete();
            setIsMoreOptionsOpen(false);
            return res;
          }}
        />
      </>
    );
  } else {
    if (indexes.values[column].type === 'boolean') {
      return (
        <>
          {item[column]
            ? t('contents.indexes.boolean.yes')
            : t('contents.indexes.boolean.no')}
        </>
      );
    } else if (indexes.values[column].type === 'string') {
      if (column !== 'review_state') {
        return <>{item[column]}</>;
      } else {
        return (
          <ReviewState state={item[column]}>
            {t(
              'contents.indexes.review_state.' +
                (item[column] ?? 'no_workflow_state'),
            )}
          </ReviewState>
        );
      }
    } else if (indexes.values[column].type === 'date') {
      const dateString = item[column];
      if (typeof dateString === 'string' && dateString !== 'None') {
        const date = new Date(dateString);

        return (
          <time dateTime={dateString} title={longFormatter.format(date)}>
            {shortFormatter.format(date)}
          </time>
        );
      } else {
        return <>{t('contents.indexes.date.none')}</>;
      }
    } else if (indexes.values[column].type === 'array') {
      const value = item[column];
      return <>{Array.isArray(value) ? value.join(', ') : value}</>;
    } else {
      // TODO do we get here? needed for type checking?
      return null;
    }
  }
}
