/**
 * Users controlpanel groups.
 * @module components/manage/Controlpanels/UsersControlpanelGroups
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Table } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import checkboxUncheckedSVG from '@plone/volto/icons/checkbox-unchecked.svg';
import checkboxCheckedSVG from '@plone/volto/icons/checkbox-checked.svg';
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
  onChangeRole(event, value) {
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
   *@param {string}
   *@returns {Boolean}
   *@memberof RenderGroups
   */
  renderIcon = (role) =>
    this.props.group.id === 'AuthenticatedUsers'
      ? this.isAuthGroup(role.id)
      : this.props.group.roles.includes(role.id);

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
          <Icon
            name={isSelected ? checkboxCheckedSVG : checkboxUncheckedSVG}
            color={isSelected ? '#007eb1' : '#826a6a'}
            onClick={(e) => {
              e.stopPropagation();
              onChangeSelect(group.id);
            }}
            size="24px"
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
              <Icon
                name={
                  this.renderIcon(role)
                    ? checkboxCheckedSVG
                    : checkboxUncheckedSVG
                }
                onClick={(e) => this.onChangeRole(e, `${group.id}.${role.id}`)}
                color={this.renderIcon(role) ? '#007eb1' : '#826a6a'}
                size="24px"
              />
            )}
          </Table.Cell>
        ))}
      </Table.Row>
    );
  }
}

export default injectIntl(RenderGroups);
