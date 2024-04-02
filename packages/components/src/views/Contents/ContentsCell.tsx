import React from 'react';
import { DialogTrigger } from 'react-aria-components';
import { Brain } from '@plone/types/src/content/brains';
import { Button } from '../../components/Button/Button';
import { Link } from '../../components/Link/Link';
import { MoreoptionsIcon, PageIcon } from '../../components/Icons';
import { indexes } from '../../helpers/indexes';
import { ItemActionsPopover } from './ItemActionsPopover';

interface Props {
  item: Brain;
  column: keyof typeof indexes | 'title' | '_actions';
}

export function ContentsCell({ item, column }: Props) {
  if (column === 'title') {
    return (
      <Link
        className="react-aria-Link title-link"
        href={`${item['@id']}${item.is_folderish ? '/contents' : ''}`}
      >
        <PageIcon />
        {item.title}
        {item.ExpirationDate !== 'None' &&
          new Date(item.ExpirationDate).getTime() < new Date().getTime() && (
            <span className="expired">Expired</span>
          )}
        {item.EffectiveDate !== 'None' &&
          new Date(item.EffectiveDate).getTime() > new Date().getTime() && (
            <span className="future">Scheduled</span>
          )}
      </Link>
    );
  } else if (column === '_actions') {
    return (
      <DialogTrigger>
        <Button aria-label="More options">
          <MoreoptionsIcon />
        </Button>
        <ItemActionsPopover
          editLink={`${item['@id']}/edit`}
          viewLink={item['@id']}
          onMoveToBottom={async () => {}}
          onMoveToTop={async () => {}}
          onCopy={async () => {}}
          onCut={async () => {}}
          onDelete={async () => {}}
        />
      </DialogTrigger>
    );
  } else {
    if (indexes[column].type === 'boolean') {
      return item[column] ? 'Yes' : 'No';
    } else if (indexes[column].type === 'string') {
      if (column !== 'review_state') {
        return item[column];
      } else {
        return (
          <div>
            <span>
              {/* <Dot color={getColor(item[index.id])} size="15px" /> */}
            </span>
            {item[column] || 'No workflow state'}
          </div>
        );
      }
    } else if (indexes[column].type === 'date') {
      if (item[column] && item[column] !== 'None') {
        // @ts-ignore TODO fix this, maybe a more strict type for the indexes?
        return new Date(item[column]).toLocaleDateString();
      } else {
        return 'None';
      }
    } else if (indexes[column].type === 'array') {
      const value = item[column];
      return Array.isArray(value) ? value.join(', ') : value;
    }
  }
}
