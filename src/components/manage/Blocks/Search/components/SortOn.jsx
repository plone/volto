import React from 'react';
import { withQueryString } from '../hocs';
import { selectTheme, sortOnSelectStyles } from './SelectStyling';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { Icon } from '@plone/volto/components';
import {
  Option,
  DropdownIndicator,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import upSVG from '@plone/volto/icons/sort-up.svg';
import downSVG from '@plone/volto/icons/sort-down.svg';
import { Button } from 'semantic-ui-react';
import { compose } from 'redux';
import { toPairs, groupBy, map } from 'lodash';
import cx from 'classnames';

const SortOn = (props) => {
  const {
    querystring,
    data = {},
    reactSelect,
    setSortOn,
    setSortOrder,
    sortOrder,
    isEditMode,
  } = props;
  const sortable_indexes = querystring.indexes;
  const Select = reactSelect.default;

  return (
    <div className="search-sort-wrapper">
      <div className="search-sort-on">
        {data.sortOnLabel && (
          <span className="sort-label">{data.sortOnLabel}</span>
        )}
        <Select
          id="select-search-sort-on"
          name="select-searchblock-sort-on"
          className="search-react-select-container"
          classNamePrefix="react-select"
          placeholder="Sort on"
          styles={sortOnSelectStyles}
          theme={selectTheme}
          components={{ DropdownIndicator, Option }}
          options={[
            {
              label: 'No selection',
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
          defaultValue={{
            value: data?.query?.sort_on || 'No selection',
            label:
              data?.query?.sort_on && sortable_indexes
                ? sortable_indexes[data?.query?.sort_on]?.title
                : data?.query?.sort_on || 'No selection',
          }}
          onChange={(data) => {
            !isEditMode && setSortOn(data.value);
          }}
        />
      </div>
      <Button
        icon
        basic
        compact
        title="Ascending"
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
        title="Descending"
        className={cx({
          active: sortOrder === 'descending',
        })}
        onClick={() => {
          !isEditMode && setSortOrder('descending');
        }}
      >
        <Icon name={upSVG} size="25px" />
      </Button>
    </div>
  );
};

export default compose(
  injectLazyLibs(['reactSelect']),
  withQueryString,
)(SortOn);
