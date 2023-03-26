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
  const Select = reactSelect.default;

  const RELEVANCE = 'relevance';
  const UNSORTED = 'unsorted';

  const { sortOnOptions = [] } = data;
  const { sortable_indexes } = querystring;

  const activeOption = searchedText
    ? sortOn
      ? sortOn
      : RELEVANCE
    : sortOn || UNSORTED;
  const showRelevance = !!searchedText; // && !sortOn;
  const showUnsorted = !(sortOn || searchedText);

  const allSortOnOptions = [
    ...(sortOnOptions || []),
    data?.query?.sort_on,
  ].reduce((acc, f) => (acc.includes(f) ? acc : [...acc, f]), []);
  const isDisabledSelect = !searchedText || allSortOnOptions.length < 1;

  const isDisabledOrder =
    activeOption === RELEVANCE || activeOption === UNSORTED;

  const value = {
    value: activeOption,
    label: messages[activeOption]
      ? intl.formatMessage(messages[activeOption])
      : sortable_indexes[activeOption]?.title,
  };
  const options = [
    ...(showRelevance
      ? [
          {
            value: RELEVANCE,
            label: intl.formatMessage(messages.relevance),
          },
        ]
      : []),
    ...(showUnsorted
      ? [
          {
            value: UNSORTED,
            label: intl.formatMessage(messages.unsorted),
          },
        ]
      : []),
    ...allSortOnOptions.map((k) => ({
      value: k,
      label: sortable_indexes[k]?.title || k,
    })),
  ];

  return (
    <div className="search-sort-wrapper">
      <div className="search-sort-on">
        <span className="sort-label">
          {intl.formatMessage(messages.sortOn)}
        </span>
        <Select
          isDisabled={isDisabledSelect}
          id="select-search-sort-on"
          name="select-searchblock-sort-on"
          className="search-react-select-container"
          classNamePrefix="react-select"
          placeholder={intl.formatMessage(messages.sortOn)}
          styles={sortOnSelectStyles}
          theme={selectTheme}
          components={{ DropdownIndicator, Option }}
          options={options}
          isSearchable={false}
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
        disabled={isDisabledOrder}
        active={sortOrder === 'ascending'}
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
        disabled={isDisabledOrder}
        active={sortOrder === 'descending'}
      >
        <Icon name={downSVG} size="25px" />
      </Button>
    </div>
  );
};

export default compose(injectIntl, injectLazyLibs(['reactSelect']))(SortOn);
