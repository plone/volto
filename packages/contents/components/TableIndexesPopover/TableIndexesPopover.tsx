import React from 'react';
import { Popover, Checkbox } from '@plone/components';
import { useTranslation } from 'react-i18next';
import PopoverListItem from '../PopoverListItem';

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
  const { t } = useTranslation();

  return (
    <Popover
      className="q react-aria-Popover table-indexes-popover"
      dialogAriaLabelledby="table-indexes-label"
    >
      <fieldset>
        <legend>{t('contents.indexes.select_columns')}</legend>

        <ul className="popover-list">
          {indexes.order.map((index) => {
            if (index === 'sortable_title') return null;
            return (
              <PopoverListItem key={index}>
                <Checkbox
                  value={index}
                  isSelected={indexes.values[index].selected}
                  onChange={() => {
                    onSelectIndex(index);
                  }}
                  label={t(indexes.values[index].label)}
                  slot={null}
                />
              </PopoverListItem>
            );
          })}
        </ul>
      </fieldset>
    </Popover>
  );
};
