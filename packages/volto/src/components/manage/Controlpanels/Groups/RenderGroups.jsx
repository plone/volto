import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Dropdown, Table, Checkbox } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import { Icon } from '@plone/volto/components';
import { canAssignRole } from '@plone/volto/helpers';

const RenderGroups = (props) => {
  const onChange = (event, { value }) => {
    const [group, role] = value.split('.');
    props.updateGroups(group, role);
  };
  const isAuthGroup = (roleId) => {
    return props.inheritedRole.includes(roleId);
  };
  const canDeleteGroup = () => {
    if (props.isUserManager) return true;
    return !props.group.roles.includes('Manager');
  };
  return (
    <Table.Row key={props.group.title}>
      <Table.Cell>{props.group.groupname}</Table.Cell>
      {props.roles.map((role) => (
        <Table.Cell key={role.id}>
          {props.inheritedRole &&
          props.inheritedRole.includes(role.id) &&
          props.group.roles.includes('Authenticated') ? (
            <Icon
              name={ploneSVG}
              size="20px"
              color="#007EB1"
              title={'plone-svg'}
            />
          ) : (
            <Checkbox
              checked={
                props.group.id === 'AuthenticatedUsers'
                  ? isAuthGroup(role.id)
                  : props.group.roles.includes(role.id)
              }
              onChange={onChange}
              value={`${props.group.id}.${role.id}`}
              disabled={!canAssignRole(props.isUserManager, role)}
            />
          )}
        </Table.Cell>
      ))}
      <Table.Cell textAlign="right">
        {canDeleteGroup() && (
          <Dropdown icon="ellipsis horizontal">
            <Dropdown.Menu className="left">
              <Dropdown.Item
                onClick={props.onDelete}
                value={props.group['@id']}
              >
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
  //single group
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
};
export default RenderGroups;
