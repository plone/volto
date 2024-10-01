import React, { lazy } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import {
  Option,
  DropdownIndicator,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import { selectTheme, sortOnSelectStyles } from './SelectStyling';

import config from '@plone/volto/registry';

const getViewTitle = (viewId) =>
  config.blocks.blocksConfig.listing.variations?.find((v) => v.id === viewId)
    ?.title;

const messages = defineMessages({
  selectView: {
    id: 'selectView',
    defaultMessage: 'Select view',
  },
});

const Select = lazy(() => import('react-select'));

function ViewSwitcher(props) {
  const { data, selectedView, setSelectedView } = props;
  const intl = useIntl();

  return (
    <Select
      id="select-search-sort-on"
      name="select-searchblock-sort-on"
      className="search-react-select-container"
      classNamePrefix="react-select"
      placeholder={intl.formatMessage(messages.selectView)}
      styles={sortOnSelectStyles}
      theme={selectTheme}
      components={{ DropdownIndicator, Option }}
      options={[
        ...data.availableViews.map((viewId) => ({
          value: viewId,
          label: getViewTitle(viewId),
        })),
      ]}
      value={selectedView}
      onChange={(data) => setSelectedView(data.value)}
    />
  );
}

export default ViewSwitcher;
