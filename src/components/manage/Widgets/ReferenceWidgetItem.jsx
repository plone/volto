/**
 * ReferenceWidget component.
 * @module components/manage/Widgets/ReferenceWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon } from 'semantic-ui-react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  // no_results_found: {
  //   id: 'No results found.',
  //   defaultMessage: 'No results found.',
  // },
});

/**
 * ReferenceWidget Item class.
 * @class ReferenceWidgetItem
 * @extends
 */
const ReferenceWidgetItem = ({ title, is_folderish, path, onSearchChange }) => (
  <Header>
    {title}
    <Header.Subheader>{path}</Header.Subheader>
    {is_folderish ? (
      <Button
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onSearchChange(e, { path });
        }}
      >
        <Icon name="world" className="right floated" />
      </Button>
    ) : null}
  </Header>
);
/**
 * Default properties
 * @property {Object} defaultProps Default properties.
 * @static
 */
ReferenceWidgetItem.defaultProps = {
  path: null,
  review_state: null,
  type: null,
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ReferenceWidgetItem.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  is_folderish: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  review_state: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ReferenceWidgetItem);
