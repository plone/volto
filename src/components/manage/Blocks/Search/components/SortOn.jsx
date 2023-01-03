import { Icon } from '@plone/volto/components';
import {
  DropdownIndicator,
  Option,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import cx from 'classnames';
import React from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { Button } from 'semantic-ui-react';
import { selectTheme, sortOnSelectStyles } from './SelectStyling';

import downSVG from '@plone/volto/icons/sort-down.svg';
import upSVG from '@plone/volto/icons/sort-up.svg';

const messages = defineMessages({
  unsorted: {
    id: 'Unsorted',
    defaultMessage: 'Unsorted',
  },
  relevance: {
    id: 'Relevance',
    defaultMessage: 'Relevance',
  },
  sortOn: {
    id: 'Sort on',
    defaultMessage: 'Sort on',
  },
  ascending: {
    id: 'Ascending',
    defaultMessage: 'Ascending',
  },
  descending: {
    id: 'Descending',
    defaultMessage: 'Descending',
  },
});

const SortOn = (props) => {
  const {
    data = {},
    searchedText,
    reactSelect,
    sortOn = null,
    sortOrder = null,
    setSortOn,
    setSortOrder,
    isEditMode,
    querystring = {},
    intl,
  } = props;
  const { sortOnOptions = [] } = data;

  // We don't want to show sorting options if there is only 1 way to sort
  if (!sortOnOptions || sortOnOptions.length < 1) {
    return null;
  }

  const { sortable_indexes } = querystring;
  const Select = reactSelect.default;

  const activeSortOn = sortOn || data?.query?.sort_on || '';

  const { sortOnOptions = [] } = data;
  const value = {
    value: activeSortOn,
    label:
      activeSortOn && sortable_indexes
        ? sortable_indexes[activeSortOn]?.title
        : activeSortOn || searchedText
        ? intl.formatMessage(messages.relevance)
        : intl.formatMessage(messages.unsorted),
  };

  debugger;

  return (
    <div className="search-sort-wrapper">
      <div className="search-sort-on">
        <span className="sort-label">
          {intl.formatMessage(messages.sortOn)}
        </span>
        <Select
          id="select-search-sort-on"
          name="select-searchblock-sort-on"
          className="search-react-select-container"
          classNamePrefix="react-select"
          placeholder={intl.formatMessage(messages.sortOn)}
          styles={sortOnSelectStyles}
          theme={selectTheme}
          components={{ DropdownIndicator, Option }}
          options={[
            { value: '', label: 'Relevance' },
            ...sortOnOptions.map((k) => ({
              value: k,
              label: sortable_indexes[k]?.title || k,
            })),
          ]}
          value={value}
          onChange={(data) => {
            !isEditMode && setSortOn(data.value);
          }}
        />
      </div>
      <Button
        icon
        basic
        compact
        title={intl.formatMessage(messages.ascending)}
        className={cx({
          active: sortOrder === 'ascending',
        })}
        onClick={() => {
          !isEditMode && setSortOrder('ascending');
        }}
      >
        <Icon name={upSVG} size="25px" />
      </Button>
      <Button
        icon
        basic
        compact
        title={intl.formatMessage(messages.descending)}
        className={cx({
          active: sortOrder === 'descending',
        })}
        onClick={() => {
          !isEditMode && setSortOrder('descending');
        }}
      >
        <Icon name={downSVG} size="25px" />
      </Button>
    </div>
  );
};

export default compose(injectIntl, injectLazyLibs(['reactSelect']))(SortOn);
