/**
 * Content Types component.
 * @module components/manage/Controlpanels/ContentTypesActions
 */

import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import trashSVG from '@plone/volto/icons/delete.svg';
import layoutSVG from '@plone/volto/icons/file.svg';
import folderSVG from '@plone/volto/icons/folder.svg';
import editSVG from '@plone/volto/icons/pen.svg';
/**
 * ContentTypesActions class.
 * @class ContentTypesActions
 * @extends Component
 */
const ContentTypesActions = ({
  item,
  path,
  onEdit,
  onDelete,
  onLayout,
  onSchema,
}) => {
  return (
    <Dropdown icon="ellipsis horizontal" className={`actions-${item.id}`}>
      <Dropdown.Menu className="left">
        <Dropdown.Item
          onClick={onEdit}
          value={`${path}/${item.id}`}
          className={`edit-${item.id}`}
        >
          <Icon name={editSVG} size="15px" />
          <FormattedMessage id="Edit" defaultMessage="Edit" />
        </Dropdown.Item>
        <Dropdown.Item onClick={onSchema} value={item.id}>
          <Icon name={folderSVG} size="15px" />
          <FormattedMessage id="Schema" defaultMessage="Schema" />
        </Dropdown.Item>
        <Dropdown.Item
          onClick={onLayout}
          value={`${path}/${item.id}/layout`}
          className={`layout-${item.id}`}
        >
          <Icon name={layoutSVG} size="15px" />
          <FormattedMessage id="Layout" defaultMessage="Layout" />
        </Dropdown.Item>
        <Dropdown.Item
          onClick={onDelete}
          value={item['@id']}
          className={`delete-${item.id}`}
        >
          <Icon name={trashSVG} size="15px" />
          <FormattedMessage id="Delete" defaultMessage="Delete" />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default injectIntl(ContentTypesActions);
