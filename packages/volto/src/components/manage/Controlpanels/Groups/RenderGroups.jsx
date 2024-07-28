/**
 * Users controlpanel groups.
 * @module components/manage/Controlpanels/UsersControlpanelGroups
 */
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dropdown, Table, Checkbox } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import { Icon } from '@plone/volto/components';
import { canAssignRole } from '@plone/volto/helpers';

/**
 * RenderGroups functional component.
 */
const RenderGroups = (props) => {
const { group, roles, inheritedRole, onDelete, isUserManager, updateGroups } =
  props;

  /**
   * @param {*} event
   * @param {*} { value }
   * @memberof UsersControlpanelUser
   */
  const onChange = (event, { value }) => {
    const [group, role] = value.split('&role=');
    updateGroups(group, role);
  };

  /**
   *@param {*}
   *@returns {Boolean}
   *@memberof RenderGroups
   */
  const isAuthGroup = (roleId) => {
    return inheritedRole.includes(roleId);
  };

  const canDeleteGroup = () => {
    if (isUserManager) return true;
    return !group.roles.includes('Manager');
  };

  return (
    <Table.Row key={group.title}>
      <Table.Cell>{group.groupname}</Table.Cell>
      {roles.map((role) => (
        <Table.Cell key={role.id}>
          {inheritedRole &&
          inheritedRole.includes(role.id) &&
          group.roles.includes('Authenticated') ? (
            <Icon
              name={ploneSVG}
              size="20px"
              color="#007EB1"
              title={'plone-svg'}
            />
          ) : (
            <Checkbox
              checked={
                group.id === 'AuthenticatedUsers'
                  ? isAuthGroup(role.id)
                  : group.roles.includes(role.id)
              }
              onChange={onChange}
              value={`${group.id}&role=${role.id}`}
              disabled={!canAssignRole(isUserManager, role)}
            />
          )}
        </Table.Cell>
      ))}
      <Table.Cell textAlign="right">
        {canDeleteGroup() && (
          <Dropdown icon="ellipsis horizontal">
            <Dropdown.Menu className="left">
              <Dropdown.Item onClick={onDelete} value={group['@id']}>
                <Icon name={trashSVG} size="15px" />
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </Table.Cell>
    </Table.Row>
  );
};

RenderGroups.propTypes = {
  // single group
  group: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
    groupname: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    }),
  ).isRequired,
  inheritedRole: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  isUserManager: PropTypes.bool.isRequired,
  updateGroups: PropTypes.func.isRequired,
};

export default injectIntl(RenderGroups);
