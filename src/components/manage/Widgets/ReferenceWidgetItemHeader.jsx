/**
 * ReferenceWidgetItemHeader component.
 * @module components/manage/Widgets/ReferenceWidgetItemHeader
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { dropRight } from 'lodash';

/**
 * ReferenceWidgetItemHeader class.
 * @class ReferenceWidgetItemHeader
 * @extends
 */
const ReferenceWidgetItemHeader = ({ title, path, onSelectFolder, id }) => {
  const parentPath = dropRight(path.split('/')).join('/');
  return (
    <Header>
      {title}
      <Header.Subheader>{path}</Header.Subheader>
      <Button
        disabled={parentPath ? '' : 'disabled'}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          console.log(parentPath);
          onSelectFolder({ title, path: parentPath, id });
        }}
      >
        <Icon name="world" className="right floated" />
      </Button>
    </Header>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ReferenceWidgetItemHeader.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  onSelectFolder: PropTypes.func.isRequired,
};

export default injectIntl(ReferenceWidgetItemHeader);
