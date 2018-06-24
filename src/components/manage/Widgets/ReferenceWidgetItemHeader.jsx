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
  const path = data ? data['@id'].replace(config.apiPath, '') : '';
  const parent = data ? dropRight(data['@id'].split('/')) : [];
  return (
    <Header>
      {path}
      <Button
        disabled={parent.length ? '' : 'disabled'}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          onSelectFolder({ '@id': parent.join('/') });
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
