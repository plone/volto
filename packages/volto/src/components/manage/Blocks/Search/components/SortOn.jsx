import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { compose } from 'redux';
import { Icon } from '@plone/volto/components';
import {
  Option,
  DropdownIndicator,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { selectTheme, sortOnSelectStyles } from './SelectStyling';

import upSVG from '@plone/volto/icons/sort-up.svg';
import downSVG from '@plone/volto/icons/sort-down.svg';

const messages = defineMessages({
  noSelection: {
    id: 'No selection',
    defaultMessage: 'No selection',
  },
  sortOn: {
    id: 'Sort on',
    defaultMessage: 'Sort on',
  },
  sortOnButtonTitle: {
    id: 'Sort on {value}',
    defaultMessage: 'Sort on {value}',
  },
  ascending: {
    id: 'Ascending',
    defaultMessage: 'Ascending',
  },
  descending: {
    id: 'Descending',
    defaultMessage: 'Descending',
  },
  sortedOn: {
    id: 'Sorted on',
    defaultMessage: 'Sorted on',
  },
});

const SortOn = (props) => {
  const {
    data = {},
    reactSelect,
    sortOn = null,
    sortOrder = null,
    setSortOn,
    setSortOrder,
    isEditMode,
    querystring = {},
    intl,
  } = props;
  const [activeSortOnButton, setActiveSortOnButton] = useState(false);
  const { sortable_indexes } = querystring;
  const Select = reactSelect.default;

  const activeSortOn = sortOn || data?.query?.sort_on || '';

  let { sortOnOptions = [] } = data;

  if (data?.query?.sort_on && sortOnOptions.length > 0) {
    sortOnOptions = [...sortOnOptions, data?.query?.sort_on];
    sortOnOptions = [...new Set(sortOnOptions)];
  }

  const showSelectField = sortOnOptions.length > 1;

  const showButtonSortOn =
    !data?.query?.sort_on && data.sortOnOptions?.length === 1;

  const buttonText =
    showButtonSortOn && sortable_indexes
      ? sortable_indexes[sortOnOptions[0]]?.title
      : sortOnOptions[0];

  const showSortedLabel = data?.query?.sort_on && sortOnOptions.length === 0;

  const value = {
    value: activeSortOn || intl.formatMessage(messages.noSelection),
    label:
      activeSortOn && sortable_indexes
        ? sortable_indexes[activeSortOn]?.title
        : activeSortOn || intl.formatMessage(messages.noSelection),
  };

  return (
    <div className="search-sort-wrapper">
      <div className="search-sort-on">
        {showSortedLabel ? (
          <span className="sorted-label">
            {intl.formatMessage(messages.sortedOn)}
            <span className="sorted-label-value">{value.label}</span>
          </span>
        ) : (
          <>
            <span className="sort-label">
              {intl.formatMessage(messages.sortOn)}
            </span>
            {showButtonSortOn ? (
              <Button
                icon
                basic
                compact
                title={intl.formatMessage(messages.sortOnButtonTitle, {
                  value: value.label,
                })}
                className={cx({
                  active: activeSortOnButton,
                })}
                onClick={() => {
                  if (!activeSortOnButton) {
                    !isEditMode && setSortOn(sortOnOptions[0]);
                  } else {
                    !isEditMode && setSortOn('');
                  }

                  setActiveSortOnButton(!activeSortOnButton);
                }}
              >
                {buttonText}
              </Button>
            ) : (
              showSelectField && (
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
                    ...sortOnOptions.map((k) => ({
                      value: k,
                      label: sortable_indexes[k]?.title || k,
                    })),
                  ]}
                  isSearchable={false}
                  value={value}
                  onChange={(data) => {
                    !isEditMode && setSortOn(data.value);
                  }}
                />
              )
            )}
          </>
        )}
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
