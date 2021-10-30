/**
 * Users controlpanel user.
 * @module components/manage/Controlpanels/UsersControlpanelUser
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
 * UsersControlpanelUser class.
 * @class UsersControlpanelUser
 * @extends Component
 */
class RenderUsers extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
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

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sharing
   */
  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }
  /**
   * @param {*} event
   * @param {*} { value }
   * @memberof UsersControlpanelUser
   */

  onChange(event, value) {
    const [user, role] = value.split('.');
    this.props.updateUser(user, role);
  }

  /**
   *@param {string}
   *@returns {Boolean}
   *@memberof RenderUsers
   */
  renderIcon = (role) => this.props.user.roles.includes(role.id);

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { selected, user, onChangeSelect, roles, inheritedRole } = this.props;
    const isSelected = selected.includes(user.id);
    return (
      <Table.Row key={this.props.user.username}>
        <Table.Cell>
          <Icon
            name={isSelected ? checkboxCheckedSVG : checkboxUncheckedSVG}
            color={isSelected ? '#007eb1' : '#826a6a'}
            onClick={(e) => {
              e.stopPropagation();
              onChangeSelect(user.id);
            }}
            size="24px"
          />
        </Table.Cell>
        <Table.Cell className="fullname">
          {user.fullname || user.username}
        </Table.Cell>
        {roles.map((role) => (
          <Table.Cell key={role.id}>
            {inheritedRole && inheritedRole.includes(role.id) ? (
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
                onClick={(e) => this.onChange(e, `${user.id}.${role.id}`)}
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

export default injectIntl(RenderUsers);
