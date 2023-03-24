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

/**
 *
 * We start with the following assumption: the "relevance" based ordering is an
 * intrinsec property which should be provided by the system, the end users
 * should automatically benefit from it.
 *
 * So we follow this logic:
 *
 * For the main listing-block derived query, the editors can choose a sort
 * order. This will be the called the "default sort", it will be used whenever
 * we don't have "an external condition" that changes that.
 *
 * If the Editor doesn't enable aditional Sort On index from the Controls
 * fieldset, the block will work like:
 *
 * - when the user loads the search block without a search term, the listing
 *   uses the "default sort" in the Query part.
 * - when the user enters a search term (or if he/she loads the search block
 *   with a search term via URL), the search block will automatically switch to
 *   "relevance" sorting.
 * - If there's only one sort option available, the SortOn control is read-only
 *   (disabled)
 * - The "relevance" sort option is automatically added as an option when the
 *   user has a "search term"
 * - If there's no "default sort" and no "search term", but the Editor enabled
 *   the Sort On control, then the Sort On control displays only one option,
 *   "Unsorted". This will force the Editor to either disable the control or
 *   add some sorting options
 *
 * If the Editor enables additional sorton indexes but doesn't define
 * a "default sort":
 *
 * - the users see an "Unsorted" option if there's no "search term"
 *
 */
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

  const isSortByRelevance = sortOn === '';
  const isUnsorted = !(sortOn || isSortByRelevance);

  const activeSortOn = data?.query?.sort_on;

  const noValueLabel = searchedText
    ? intl.formatMessage(messages.relevance)
    : intl.formatMessage(messages.unsorted);

  const value = isSortByRelevance
    ? {
        value: '',
        label: intl.formatMessage(messages.relevance),
      }
    : isUnsorted
    ? {
        value: 'unsorted',
        label: intl.formatMessage(messages.unsorted),
      }
    : {
        value: activeSortOn,
        label:
          activeSortOn && sortable_indexes
            ? sortable_indexes[activeSortOn]?.title
            : noValueLabel,
      };

  return (
    <div className="search-sort-wrapper">
      <div className="search-sort-on">
        <span className="sort-label">
          {intl.formatMessage(messages.sortOn)}
        </span>
        <Select
          disabled={isUnsorted}
          id="select-search-sort-on"
          name="select-searchblock-sort-on"
          className="search-react-select-container"
          classNamePrefix="react-select"
          placeholder={intl.formatMessage(messages.sortOn)}
          styles={sortOnSelectStyles}
          theme={selectTheme}
          components={{ DropdownIndicator, Option }}
          options={[
            { value: '', label: noValueLabel },
            ...sortOnOptions.map((k) => ({
              value: k,
              label: k === '' ? noValueLabel : sortable_indexes[k]?.title || k,
            })),
          ]}
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
        disabled={!activeSortOn}
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
        disabled={!activeSortOn}
      >
        <Icon name={downSVG} size="25px" />
      </Button>
    </div>
  );
};

export default compose(injectIntl, injectLazyLibs(['reactSelect']))(SortOn);
