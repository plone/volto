/**
 * ReferenceWidgetItemHeader component.
 * @module components/manage/Widgets/ReferenceWidgetItemHeader
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { dropRight } from 'lodash';
import config from '../../../config';

/**
 * ReferenceWidgetItemHeader class.
 * @class ReferenceWidgetItemHeader
 * @extends
 */
const ReferenceWidgetItemHeader = ({ data, onSelectFolder }) => {
  console.log(data);

  const path = data ? data['@id'].replace(config.apiPath, '') : '';
  const parentPath = dropRight(path.split('/')).join('/');
  const parentId = data ? dropRight(data['@id'].split('/')).join('/') : '';
  return (
    <Header>
      {path}
      {/* <Header.Subheader>{path}</Header.Subheader> */}
      <Button
        disabled={parentPath ? '' : 'disabled'}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onSelectFolder({ '@id': parentId });
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
  data: PropTypes.shape({
    '@id': PropTypes.string.isRequired,
    '@type': PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    is_folderish: PropTypes.bool.isRequired,
  }).isRequired,
  onSelectFolder: PropTypes.func.isRequired,
};

export default injectIntl(ReferenceWidgetItemHeader);
