import React from 'react';
import { Menu, MenuItem, SubmenuTrigger } from 'react-aria-components';
import {
  ChevronrightIcon,
  Popover,
  type PopoverProps,
} from '@plone/components';
import { useContentsContext } from '../providers/contents';

interface Props extends Omit<PopoverProps, 'children'> {
  indexes: {
    [index: string]: {
      label: string;
      sort_on?: string;
    };
  };
  sortItems: (index: string) => void;
}

const sortIndexes = [
  // TODO "id" is a reserved key for table rows, so we cannot add the "ID" column at this time
  // 'id',
  'sortable_title',
  'EffectiveDate',
  'CreationDate',
  'ModificationDate',
  'portal_type',
];

interface MenuItem {
  id: string;
  name: string;
  children?: MenuItem[];
}

export function RearrangePopover({
  indexes,
  sortItems,
  ...popoverProps
}: Props) {
  const { intl } = useContentsContext();

  const menuItems: MenuItem[] = sortIndexes.map((index) => ({
    id: index,
    name: intl.formatMessage({ id: indexes[index].label }),
    children: [
      {
        id: `${indexes[index].sort_on}|ascending`,
        name: intl.formatMessage({ id: 'Ascending' }),
      },
      {
        id: `${indexes[index].sort_on}|descending`,
        name: intl.formatMessage({ id: 'Descending' }),
      },
    ],
  }));

  return (
    <Popover
      {...popoverProps}
      className="react-aria-Popover rearrange-popover"
      dialogAriaLabelledby="rearrange-popover-label"
    >
      <p className="label" id="rearrange-popover-label">
        {intl.formatMessage({ id: 'Rearrange items by…' })}
      </p>
      <Menu items={menuItems}>
        {function renderSubmenu(item) {
          if (item.children) {
            return (
              <SubmenuTrigger delay={100}>
                <MenuItem
                  key={item.id}
                  textValue={item.name}
                  className={({ isFocused, isOpen }) =>
                    `react-aria-MenuItem rearrange-menu-item ${
                      isFocused ? 'focused' : ''
                    } ${isOpen ? 'open' : ''}`
                  }
                >
                  {({ hasSubmenu }) => (
                    <>
                      {item.name}
                      {hasSubmenu && <ChevronrightIcon />}
                    </>
                  )}
                </MenuItem>
                <Popover
                  dialogAriaLabel={intl.formatMessage(
                    { id: 'contentsNextPickSortOrder' },
                    {
                      index: item.name,
                    },
                  )}
                >
                  <Menu
                    items={item.children}
                    onAction={(id) => {
                      sortItems(id.toString());
                    }}
                  >
                    {(item) => renderSubmenu(item)}
                  </Menu>
                </Popover>
              </SubmenuTrigger>
            );
          } else {
            return <MenuItem key={item.id}>{item.name}</MenuItem>;
          }
        }}
      </Menu>
    </Popover>
  );
}
