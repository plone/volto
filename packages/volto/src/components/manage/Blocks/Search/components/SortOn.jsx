import { Button } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { compose } from 'redux';
import Icon from '@plone/volto/components/theme/Icon/Icon';
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
  loading: {
    id: 'Loading…',
    defaultMessage: 'Loading…',
  },
  effectiveDate: {
    id: 'Effective date',
    defaultMessage: 'Effective date',
  },
  creationDate: {
    id: 'Creation date',
    defaultMessage: 'Creation date',
  },
  modificationDate: {
    id: 'Modification date',
    defaultMessage: 'Modification date',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  id: {
    id: 'ID',
    defaultMessage: 'ID',
  },
  numberOfItems: {
    id: 'Number of items',
    defaultMessage: 'Number of items',
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
  const { sortable_indexes = {}, loaded: querystringLoaded = false } =
    querystring;
  const Select = reactSelect.default;

  const defaultSortOn = data?.query?.sort_on || '';
  const activeSortOn = sortOn || defaultSortOn;

  // Fallback labels when backend returns raw key (e.g. "effective") as title
  const fallbackLabels = {
    effective: intl.formatMessage(messages.effectiveDate),
    created: intl.formatMessage(messages.creationDate),
    modified: intl.formatMessage(messages.modificationDate),
    sortable_title: intl.formatMessage(messages.title),
    id: intl.formatMessage(messages.id),
    getRawCount: intl.formatMessage(messages.numberOfItems),
  };

  const getLabel = (key) => {
    if (!key) return null;
    const title = sortable_indexes?.[key]?.title;
    if (title && String(title).toLowerCase() !== String(key).toLowerCase()) {
      return title;
    }
    return fallbackLabels[key] || title || null;
  };

  let { sortOnOptions = [] } = data;
  sortOnOptions = [defaultSortOn, ...sortOnOptions];
  sortOnOptions = [...new Set(sortOnOptions)];

  const showSelectField = sortOnOptions.length > 1;
  if (!showSelectField && !activeSortOn) {
    return null;
  }

  // Show "Loading…" only while querystring is not loaded yet; once loaded use getLabel (or fallback)
  const labelsLoading =
    activeSortOn && !querystringLoaded && !getLabel(activeSortOn);
  const loadingMsg = intl.formatMessage(messages.loading);
  const noSelectionMsg = intl.formatMessage(messages.noSelection);

  const value = {
    value: activeSortOn || noSelectionMsg,
    label:
      getLabel(activeSortOn) || (labelsLoading ? loadingMsg : noSelectionMsg),
  };

  const options = labelsLoading
    ? [{ value: activeSortOn, label: loadingMsg }]
    : sortOnOptions.map((k) => ({
        value: k,
        label: getLabel(k) || noSelectionMsg,
      }));

  return (
    <div className="search-sort-wrapper">
      <div className="search-sort-on">
        {showSelectField ? (
          <>
            <span className="sort-label">
              {intl.formatMessage(messages.sortOn)}
            </span>
            {labelsLoading ? (
              <span
                id="select-search-sort-on"
                className="search-react-select-container sorted-label-value"
                aria-label={intl.formatMessage(messages.sortOn)}
              >
                {intl.formatMessage(messages.loading)}
              </span>
            ) : (
              <Select
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
            )}
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
            type="button"
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
            type="button"
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
