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
const ReferenceWidgetItemHeader = ({ path, onSelectFolder, id }) => {
  const parentPath = dropRight(path.split('/')).join('/');
  const parentId = dropRight(id.split('/')).join('/');
  return (
    <Header>
      {path}
      {/* <Header.Subheader>{path}</Header.Subheader> */}
      <Button
        disabled={parentPath ? '' : 'disabled'}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onSelectFolder({ path: parentPath, id: parentId });
        }}
        content="<"
      />
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
  title: PropTypes.string,
  path: PropTypes.string.isRequired,
  onSelectFolder: PropTypes.func.isRequired,
};

export default injectIntl(ReferenceWidgetItemHeader);
