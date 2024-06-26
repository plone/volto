/**
 * Users controlpanel user.
 * @module components/manage/Controlpanels/UsersControlpanelUser
 */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dropdown, Table, Checkbox, Loader } from 'semantic-ui-react';
import trashSVG from '@plone/volto/icons/delete.svg';
import editSVG from '@plone/volto/icons/editing.svg';
import { Icon, Toast } from '@plone/volto/components';
import { ModalForm } from '@plone/volto/components/manage/Form';
import { updateUser } from '@plone/volto/actions';
import ploneSVG from '@plone/volto/icons/plone.svg';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { messages, canAssignRole } from '@plone/volto/helpers';
import { toast } from 'react-toastify';

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
    this.state = {
      user: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onEditUserError = this.onEditUserError.bind(this);
    this.onEditUserSubmit = this.onEditUserSubmit.bind(this);
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.updateRequest.loading &&
      this.props.updateRequest.loaded &&
      this.state?.user?.id === this.props?.user?.id
    ) {
      this.setState({ user: {} });
      this.props.listUsers();
      return toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.updateUserSuccess)}
        />,
      );
    }
  }

  onEditUserSubmit(data, callback) {
    // Do not handle groups and roles in this form
    delete data.groups;
    delete data.roles;
    this.props.updateUserData(data.id, data);
  }

  onEditUserError() {
    return toast.error(
      <Toast
        error
        title={this.props.intl.formatMessage(messages.error)}
        content={this.props.intl.formatMessage(
          messages.addUserFormPasswordAndSendPasswordTogetherNotAllowed,
        )}
      />,
    );
  }

  onClickEdit(props) {
    const { formData } = props;
    this.setState({ user: { ...formData } });
  }

  canDeleteUser() {
    if (this.props.isUserManager) return true;
    return !this.props.user.roles.includes('Manager');
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
          {this.props.user.fullname
            ? this.props.user.fullname
            : this.props.user.username}{' '}
          ({this.props.user.username})
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
                disabled={!canAssignRole(this.props.isUserManager, role)}
              />
            )}
          </Table.Cell>
        ))}
        <Table.Cell textAlign="center">
          {this.props.loading === true ? (
            <Loader active inline />
          ) : (
            this.canDeleteUser() && (
              <Dropdown icon="ellipsis horizontal">
                <Dropdown.Menu className="left">
                  {this.props.userschema && (
                    <Dropdown.Item
                      id="edit-user-button"
                      onClick={() => {
                        this.onClickEdit({ formData: this.props.user });
                      }}
                      value={this.props.user['@id']}
                    >
                      <Icon name={editSVG} size="15px" />
                      <FormattedMessage id="Edit" defaultMessage="Edit" />
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item
                    id="delete-user-button"
                    onClick={this.props.onDelete}
                    value={this.props.user['@id']}
                  >
                    <Icon name={trashSVG} size="15px" />
                    <FormattedMessage id="Delete" defaultMessage="Delete" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
          )}
        </Table.Cell>
        {Object.keys(this.state.user).length > 0 &&
          this.props.userschema.loaded && (
            <ModalForm
              className="modal"
              onSubmit={this.onEditUserSubmit}
              submitError={this.state.editUserError}
              formData={this.state.user}
              onCancel={() => this.setState({ user: {} })}
              title={this.props.intl.formatMessage(
                messages.updateUserFormTitle,
              )}
              loading={this.props.updateRequest.loading}
              schema={this.props.userschema.userschema}
            />
          )}
      </Table.Row>
    );
  }
}
export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      updateRequest: state.users?.update,
    }),
    { updateUserData: updateUser },
  ),
)(RenderUsers);
