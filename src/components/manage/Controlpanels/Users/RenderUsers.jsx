/**
 * Users controlpanel user.
 * @module components/manage/Controlpanels/UsersControlpanelUser
 */

import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dropdown, Table, Checkbox } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import { Icon } from '@plone/volto/components';
import ploneSVG from '@plone/volto/icons/plone.svg';

function RenderUsers({ user, roles, inheritedRole, updateUser, onDelete }) {
  /**
   * @param {*} event
   * @param {*} { value }
   * @memberof UsersControlpanelUser
   */
  function onChange(event, { value }) {
    const [user, role] = value.split('&role=');
    updateUser(user, role);
  }

  return (
    <Table.Row key={user.username}>
      <Table.Cell className="fullname">
        {user.fullname ? user.fullname : user.username}
      </Table.Cell>
      {roles.map((role) => (
        <Table.Cell key={role.id}>
          {inheritedRole && inheritedRole.includes(role.id) ? (
            <Icon
              name={ploneSVG}
              size="20px"
              color="#007EB1"
              title={'plone-svg'}
            />
          ) : (
            <Checkbox
              checked={user.roles.includes(role.id)}
              onChange={onChange}
              value={`${user.id}&role=${role.id}`}
            />
          )}
        </Table.Cell>
      ))}
      <Table.Cell textAlign="right">
        <Dropdown icon="ellipsis horizontal">
          <Dropdown.Menu className="left">
            <Dropdown.Item onClick={onDelete} value={user['@id']}>
              <Icon name={trashSVG} size="15px" />
              <FormattedMessage id="Delete" defaultMessage="Delete" />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Table.Cell>
    </Table.Row>
  );
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 *
 */

RenderUsers.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
    fullname: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default injectIntl(RenderUsers);
