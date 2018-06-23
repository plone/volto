/**
 * ReferenceWidget component.
 * @module components/manage/Widgets/ReferenceWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';
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
const ReferenceWidgetItem = ({ title, is_folderish, description }) => (
  <Header subheader={description}>
    {title}
    {description}
    {is_folderish ? <Icon name="folder" className="right floated" /> : null}
  </Header>
);
/**
 * Default properties
 * @property {Object} defaultProps Default properties.
 * @static
 */
ReferenceWidgetItem.defaultProps = {
  description: null,
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
  description: PropTypes.string,
  review_state: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(ReferenceWidgetItem);
