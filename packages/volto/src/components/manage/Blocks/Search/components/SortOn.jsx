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
  const { sortable_indexes } = querystring;
  const Select = reactSelect.default;

  const defaultSortOn = data?.query?.sort_on || '';
  const activeSortOn = sortOn || defaultSortOn;

  let { sortOnOptions = [] } = data;
  sortOnOptions = [defaultSortOn, ...sortOnOptions];
  sortOnOptions = [...new Set(sortOnOptions)];

  const showSelectField = sortOnOptions.length > 1;
  if (!showSelectField && !activeSortOn) {
    return;
  }
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
        {showSelectField ? (
          <>
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
                ...sortOnOptions.map((k) => ({
                  value: k,
                  label:
                    sortable_indexes[k]?.title ||
                    k ||
                    intl.formatMessage(messages.noSelection),
                })),
              ]}
              isSearchable={false}
              value={value}
              onChange={(data) => {
                !isEditMode && setSortOn(data.value);
              }}
            />
          </>
        ) : (
          <span className="sorted-label">
            {intl.formatMessage(messages.sortedOn)}
            <span className="sorted-label-value">{value.label}</span>
          </span>
        )}
      </div>
      {activeSortOn ? (
        <>
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
            <Icon name={downSVG} size="25px" />
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
            <Icon name={upSVG} size="25px" />
          </Button>
        </>
      ) : null}
    </div>
  );
};

export default compose(injectIntl, injectLazyLibs(['reactSelect']))(SortOn);
