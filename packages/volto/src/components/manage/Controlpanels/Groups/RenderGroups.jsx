/**
 * Users controlpanel groups.
 * @module components/manage/Controlpanels/UsersControlpanelGroups
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dropdown, Table, Checkbox, Loader } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import { Icon } from '@plone/volto/components';
import { canAssignRole } from '@plone/volto/helpers';

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
    isUserManager: PropTypes.bool.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sharing
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @param {*} event
   * @param {*} { value }
   * @memberof UsersControlpanelUser
   */
  onChange(event, { value }) {
    const [group, role] = value.split('&role=');
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

  canDeleteGroup() {
    if (this.props.isUserManager) return true;
    return !this.props.group.roles.includes('Manager');
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Table.Row key={this.props.group.title}>
        <Table.Cell>{this.props.group.groupname}</Table.Cell>
        {this.props.roles.map((role) => (
          <Table.Cell key={role.id}>
            {this.props.inheritedRole &&
            this.props.inheritedRole.includes(role.id) &&
            this.props.group.roles.includes('Authenticated') ? (
              <Icon
                name={ploneSVG}
                size="20px"
                color="#007EB1"
                title={'plone-svg'}
              />
            ) : (
              <Checkbox
                checked={
                  this.props.group.id === 'AuthenticatedUsers'
                    ? this.isAuthGroup(role.id)
                    : this.props.group.roles.includes(role.id)
                }
                onChange={this.onChange}
                value={`${this.props.group.id}&role=${role.id}`}
                disabled={!canAssignRole(this.props.isUserManager, role)}
              />
            )}
          </Table.Cell>
        ))}
        <Table.Cell textAlign="center">
          {this.props.loading === true ? (
            <Loader active inline />
          ) : (
            this.canDeleteGroup() && (
              <Dropdown icon="ellipsis horizontal">
                <Dropdown.Menu className="left">
                  <Dropdown.Item
                    onClick={this.props.onDelete}
                    value={this.props.group['@id']}
                  >
                    <Icon name={trashSVG} size="15px" />
                    <FormattedMessage id="Delete" defaultMessage="Delete" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default injectIntl(RenderGroups);
