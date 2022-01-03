/**
 * Users controlpanel groups.
 * @module components/manage/Controlpanels/UsersControlpanelGroups
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Table, Checkbox } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import groupSVG from '@plone/volto/icons/group.svg';

/**
 * UsersControlpanelGroups class.
 * @class UsersControlpanelGroups
 * @extends Component
 */
class RenderGroups extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sharing
   */
  constructor(props) {
    super(props);
    this.onChangeRole = this.onChangeRole.bind(this);
  }

  /**
   * @param {*} event
   * @param {*} { value }
   * @memberof UsersControlpanelUser
   */
  onChangeRole(event, { value }) {
    const [group, role] = value.split('.');
    this.props.updateGroups(group, role);
  }

  /**
   *@param {*}
   *@returns {Boolean}
   *@memberof RenderGroups
   */
  isAuthGroup = (roleId) => {
    return this.props.inheritedRole.includes(roleId);
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      selected,
      group,
      onChangeSelect,
      roles,
      inheritedRole,
    } = this.props;
    const isSelected = selected.includes(group.id);
    return (
      <Table.Row key={group.title}>
        <Table.Cell>
          <Checkbox
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onChangeSelect(group.id);
            }}
            value={`${group.id}`}
          />
        </Table.Cell>
        <Table.Cell>{group.groupname}</Table.Cell>
        {roles.map((role) => (
          <Table.Cell key={role.id}>
            {inheritedRole &&
            inheritedRole.includes(role.id) &&
            group.roles.includes('Authenticated') ? (
              <Icon
                name={groupSVG}
                size="20px"
                color="#007EB1"
                title={'plone-svg'}
              />
            ) : (
              <Checkbox
                checked={
                  group.id === 'AuthenticatedUsers'
                    ? this.isAuthGroup(role.id)
                    : group.roles.includes(role.id)
                }
                onChange={this.onChangeRole}
                value={`${this.props.group.id}.${role.id}`}
              />
            )}
          </Table.Cell>
        ))}
      </Table.Row>
    );
  }
}

export default injectIntl(RenderGroups);
