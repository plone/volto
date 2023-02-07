import React from 'react';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import {
  Option,
  DropdownIndicator,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

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

function ViewSwitcher(props) {
  const { data, intl, reactSelect, selectedView, setSelectedView } = props;
  const Select = reactSelect.default;

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

export default compose(
  injectIntl,
  injectLazyLibs(['reactSelect']),
)(ViewSwitcher);
