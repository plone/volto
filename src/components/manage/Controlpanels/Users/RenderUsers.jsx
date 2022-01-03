/**
 * Users controlpanel user.
 * @module components/manage/Controlpanels/UsersControlpanelUser
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Table, Checkbox } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
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

  onChange(event, { value }) {
    const [user, role] = value.split('.');
    this.props.updateUser(user, role);
  }

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
          <Checkbox
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onChangeSelect(user.id);
            }}
            value={`${user.id}`}
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
              <Checkbox
                checked={user.roles.includes(role.id)}
                onChange={this.onChange}
                value={`${user.id}.${role.id}`}
              />
            )}
          </Table.Cell>
        ))}
      </Table.Row>
    );
  }
}

export default injectIntl(RenderUsers);
