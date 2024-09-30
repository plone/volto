import React from 'react';
import { Popover, Checkbox } from '@plone/components';
import { useContentsContext } from '../providers/contents';

interface Props {
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
  onSelectIndex: (index: string) => void;
}

export const TableIndexesPopover = ({ indexes, onSelectIndex }: Props) => {
  const { intl } = useContentsContext();

  return (
    <Popover className="react-aria-Popover table-indexes-popover scroll">
      <ul className="table-indexes-list">
        {indexes.order.map((index) => {
          if (index === 'sortable_title') return null;
          return (
            <li key={index} className="table-indexes-list-item">
              <Checkbox
                value={index}
                isSelected={indexes.values[index].selected}
                onChange={() => {
                  onSelectIndex(index);
                }}
                label={intl.formatMessage({ id: indexes.values[index].label })}
                slot={null}
              />
            </li>
          );
        })}
      </ul>
    </Popover>
  );
};
