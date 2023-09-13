/**
 * Users controlpanel user.
 * @module components/manage/Controlpanels/UsersControlpanelUser
 */
import { Icon } from '@plone/volto/components';
import trashSVG from '@plone/volto/icons/delete.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import showSVG from '@plone/volto/icons/show.svg';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { Checkbox, Dropdown, Table } from 'semantic-ui-react';

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
    const [user, role] = value.split('&role=');
    this.props.updateUser(user, role);
  }
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Table.Row key={this.props.user.username}>
        <Table.Cell className="fullname">
          <Link to={`/personal-information/${this.props.user.username}`}>
            {this.props.user.fullname
              ? this.props.user.fullname
              : this.props.user.username}
          </Link>
        </Table.Cell>
        {this.props.roles.map((role) => (
          <Table.Cell key={role.id}>
            {this.props.inheritedRole &&
            this.props.inheritedRole.includes(role.id) ? (
              <Icon
                name={ploneSVG}
                size="20px"
                color="#007EB1"
                title={'plone-svg'}
              />
            ) : (
              <Checkbox
                checked={this.props.user.roles.includes(role.id)}
                onChange={this.onChange}
                value={`${this.props.user.id}&role=${role.id}`}
              />
            )}
          </Table.Cell>
        ))}
        <Table.Cell textAlign="right">
          <Dropdown icon="ellipsis horizontal">
            <Dropdown.Menu className="left">
              <Dropdown.Item
                onClick={() => {
                  this.props.history.push(
                    `/personal-information/${this.props.user.username}`,
                  );
                }}
                value={this.props.user['@id']}
              >
                <Icon name={showSVG} size="15px" />
                <FormattedMessage
                  id="View user info"
                  defaultMessage="View user info"
                />
              </Dropdown.Item>
              <Dropdown.Item
                onClick={this.props.onDelete}
                value={this.props.user['@id']}
              >
                <Icon name={trashSVG} size="15px" />
                <FormattedMessage id="Delete" defaultMessage="Delete" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default compose(injectIntl, withRouter)(RenderUsers);
