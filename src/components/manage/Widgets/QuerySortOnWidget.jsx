import React from 'react';
import { FormFieldWrapper } from '@plone/volto/components';
import { toPairs, groupBy, map } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import loadable from '@loadable/component';
const Select = loadable(() => import('react-select'));

const messages = defineMessages({
  SortOn: {
    id: 'Sort on',
    defaultMessage: 'Sort on',
  },
  NoSelection: {
    id: 'No selection',
    defaultMessage: 'No selection',
  },
});

export default function QueryStringSortOnWidget(props) {
  const { id, value, onChange } = props;
  const sortable_indexes = useSelector(
    (state) => state.querystring.sortable_indexes,
  );
  const intl = useIntl();

  return (
    <FormFieldWrapper
      {...props}
      draggable={false}
      className="simple-color-picker-widget"
    >
      <Select
        id="select-listingblock-sort-on"
        name="select-listingblock-sort-on"
        className="react-select-container"
        classNamePrefix="react-select"
        // placeholder="Select criteria"
        options={[
          {
            label: intl.formatMessage(messages.NoSelection),
            value: '',
          },
          ...map(
            toPairs(
              groupBy(toPairs(sortable_indexes), (item) => item[1].group),
            ),
            (group) => ({
              label: group[0],
              options: map(group[1], (field) => ({
                label: field[1].title,
                value: field[0],
              })),
            }),
          ),
        ]}
        styles={customSelectStyles}
        theme={selectTheme}
        components={{ DropdownIndicator, Option }}
        value={{
          value: value || '',
          label:
            value && sortable_indexes
              ? sortable_indexes[value]?.title
              : value || intl.formatMessage(messages.NoSelection),
        }}
        onChange={(field) => {
          onChange(id, field.value);
        }}
      />
    </FormFieldWrapper>
  );
}
