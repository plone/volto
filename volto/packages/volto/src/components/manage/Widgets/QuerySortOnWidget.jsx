import React from 'react';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import toPairs from 'lodash/toPairs';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

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

function QueryStringSortOrderWidget(props) {
  const { id, value, onChange, reactSelect, isDisabled } = props;
  const sortable_indexes = useSelector(
    (state) => state.querystring.sortable_indexes,
  );
  const intl = useIntl();
  const Select = reactSelect.default;

  return (
    <FormFieldWrapper
      {...props}
      draggable={false}
      className="query-sort-on-widget"
    >
      <Select
        id="select-listingblock-sort-on"
        name="select-listingblock-sort-on"
        className="react-select-container"
        classNamePrefix="react-select"
        // placeholder="Select criteria"
        isDisabled={isDisabled}
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

export default injectLazyLibs(['reactSelect'])(QueryStringSortOrderWidget);
