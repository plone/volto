/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/UsersControlpanel
 */
import {
  createGroup,
  deleteGroup,
  listGroups,
  getControlpanel,
  listRoles,
  updateGroup,
  authenticatedRole,
  getUser,
} from '@plone/volto/actions';
import jwtDecode from 'jwt-decode';
import {
  Icon,
  Toast,
  Toolbar,
  Pagination,
  Error,
} from '@plone/volto/components';
import RenderGroups from '@plone/volto/components/manage/Controlpanels/Groups/RenderGroups';
import { ModalForm } from '@plone/volto/components/manage/Form';
import { Link } from 'react-router-dom';
import { map, pull, includes } from 'lodash';
import {
  Helmet,
  messages,
  isManager,
  canAssignRole,
} from '@plone/volto/helpers';
import clearSVG from '@plone/volto/icons/clear.svg';
import addUserSvg from '@plone/volto/icons/add-user.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import { find, map, pull } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { connect } from 'react-redux';

import { toast } from 'react-toastify';
import { bindActionCreators, compose } from 'redux';
import {
  Confirm,
  Container,
  Button,
  Input,
  Loader,
  Segment,
  Menu,
  Popup,
  Table,
  Checkbox,
  Dimmer,
} from 'semantic-ui-react';
import clearSVG from '@plone/volto/icons/clear.svg';
import addUserSvg from '@plone/volto/icons/add-user.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import groupSVG from '@plone/volto/icons/group.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import zoomSVG from '@plone/volto/icons/zoom.svg';

/**
 * GroupsControlpanel class.
 * @class GroupsControlpanel
 * @extends Component
 */
class GroupsControlpanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    listRoles: PropTypes.func.isRequired,
    listGroups: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    roles: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        id: PropTypes.string,
      }),
    ).isRequired,
    groups: PropTypes.arrayOf(
      PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
        roles: PropTypes.arrayOf(PropTypes.string),
        groupname: PropTypes.string,
      }),
    ).isRequired,
    user: PropTypes.shape({
      '@id': PropTypes.string,
      id: PropTypes.string,
      description: PropTypes.string,
      email: PropTypes.string,
      fullname: PropTypes.string,
      groups: PropTypes.object,
      location: PropTypes.string,
      portrait: PropTypes.string,
      home_page: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.string),
      username: PropTypes.string,
    }).isRequired,
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
      search: '',
      isLoading: false,
      addGroupError: '',
      showDelete: false,
      showAddGroup: false,
      groupEntries: [],
      isClient: false,
      currentPage: 0,
      pageSize: 10,
      selected: [],
    };
  }

  fetchData = async () => {
    await this.props.getControlpanel('usergroup');
    await this.props.listRoles();
    if (!this.props.many_groups) {
      await this.props.listGroups();
      this.setState({
        groupEntries: this.props.groups,
      });
    }
    await this.props.getUser(this.props.userId);
  };
  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({
      isClient: true,
    });
    this.fetchData();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      (this.props.deleteGroupRequest.loading &&
        nextProps.deleteGroupRequest.loaded) ||
      (this.props.createGroupRequest.loading &&
        nextProps.createGroupRequest.loaded)
    ) {
      this.props.listGroups(this.state.search);
    }
    if (
      this.props.deleteGroupRequest.loading &&
      nextProps.deleteGroupRequest.loaded
    ) {
      this.onDeleteGroupSuccess();
    }
    if (
      this.props.createGroupRequest.loading &&
      nextProps.createGroupRequest.loaded
    ) {
      this.onAddGroupSuccess();
    }
    if (
      this.props.createGroupRequest.loading &&
      nextProps.createGroupRequest.error
    ) {
      this.onAddGroupError(nextProps.createGroupRequest.error);
    }
    if (
      this.props.loadRolesRequest.loading &&
      nextProps.loadRolesRequest.error
    ) {
      this.setState({
        error: nextProps.loadRolesRequest.error,
      });
    }
  }

  /**
   *
   *
   * @param {*} event Event object
   * @memberof GroupsControlpanel
   * @returns {undefined}
   */
  onSearchGroups(event) {
    this.setState({ isLoading: true });
    event.preventDefault();
    this.props
      .listGroups(this.state.search)
      .then(() => {
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        this.setState({ isLoading: false });
        // eslint-disable-next-line no-console
        console.error('Error searching group', error);
      });
  }

  /**
   * On change search handler
   * @method onChangeSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  onChangeSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
  };

  /**
   *
   *
   * @param {*} event Event object.
   * @param {*} { value } id (groupname)
   * @memberof GroupsControlpanel
   * @returns {undefined}
   */
  onDeleteSelected = () => {
    this.setState({
      showDelete: true,
    });
  };

  /**
   * On delete ok
   * @method onDeleteOk
   * @returns {undefined}
   */
  onDeleteOk = () => {
    const { selected } = this.state;
    if (selected) {
      for (let i = 0; i < selected.length; i++) {
        this.props.deleteGroup(selected[i]);
      }
    }
    this.setState({
      showDelete: false,
      selected: [],
    });
  };

  /**
   * On delete cancel
   * @method onDeleteCancel
   * @returns {undefined}
   */
  onDeleteCancel = () => {
    this.setState({
      showDelete: false,
    });
  };

  /**
   *
   * @param {*} name
   * @param {*} value
   * @memberof GroupsControlpanel
   */
  updateGroupRole = (name, value) => {
    this.setState((prevState) => ({
      groupEntries: map(this.state.groupEntries, (entry) => ({
        ...entry,
        roles:
          entry.id === name && !includes(entry.roles, value)
            ? [...entry.roles, value]
            : entry.id !== name
              ? entry.roles
              : pull(entry.roles, value),
      })),
    }));
  };
  /**
   * @param {*} event
   * @memberof GroupsControlpanel
   */
  updateGroupRoleSubmit = (e) => {
    e.stopPropagation();
    this.state.groupEntries.forEach((item) => {
      this.props.updateGroup(item.id, item);
    });
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.updateGroups)}
      />,
    );
  };
  /**
   *
   *
   * @param {object} data Form data from the ModalForm.
   * @param {func} callback to set new form data in the ModalForm
   * @memberof GroupsControlpanel
   * @returns {undefined}
   */
  onAddGroupSubmit = (data, callback) => {
    this.props.createGroup(data);
    this.setState({
      addGroupSetFormDataCallback: callback,
    });
  };

  /**
   * Handle Errors after createGroup()
   *
   * @param {*} error object. Requires the property .message
   * @memberof GroupsControlpanel
   * @returns {undefined}
   */
  onAddGroupError = (error) => {
    this.setState({
      addGroupError: error.response.body.message,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.groups !== prevProps.groups) {
      this.setState({
        groupEntries: this.props.groups,
      });
    }
  }

  /**
   * Handle Success after createGroup()
   *
   * @memberof GroupsControlpanel
   * @returns {undefined}
   */
  onAddGroupSuccess = () => {
    this.state.addGroupSetFormDataCallback({});
    this.setState({
      showAddGroup: false,
      addGroupError: undefined,
      addGroupSetFormDataCallback: undefined,
    });
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.groupCreated)}
      />,
    );
  };

  /**
   * Handle Success after deleteGroup()
   *
   * @returns {undefined}
   */
  onDeleteGroupSuccess() {
    this.setState({
      groupToDelete: undefined,
      showDelete: false,
    });
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.success)}
        content={this.props.intl.formatMessage(messages.groupDeleted)}
      />,
    );
  }

  /**
   * On change page
   * @method onChangePage
   * @param {object} event Event object.
   * @param {string} value Page value.
   * @returns {undefined}
   */
  onChangePage = (event, { value }) => {
    this.setState({
      currentPage: value,
    });
  };

  /**
   * On select all handler
   * @method onSelectAll
   * @returns {undefined}
   */
  onSelectAll = () => {
    const { groupEntries } = this.state;
    this.setState((prevState) => ({
      selected:
        prevState.selected.length === groupEntries.length
          ? []
          : map(groupEntries, (item) => item.id),
    }));
  };

  /**
   * On select single group handler
   * @method onChangeSelect
   * @returns {undefined}
   */
  onChangeSelect = (id) => {
    this.setState((prevState) => ({
      selected: !includes(prevState.selected, id)
        ? [...prevState.selected, id]
        : pull(prevState.selected, id),
    }));
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    /*let fullnameToDelete = this.state.groupToDelete
        ? this.state.groupToDelete.fullname
        : '';*/

    const isSelectedAll =
      this.state.groupEntries.length > 0
        ? this.state.selected.length === this.state.groupEntries.length
        : false;

    const isUserManager = isManager(this.props.user);

    return (
      <Container className="users-control-panel">
        <Helmet title={this.props.intl.formatMessage(messages.groups)} />
        <div className="container">
          <Confirm
            open={this.state.showDelete}
            header={this.props.intl.formatMessage(
              messages.deleteGroupConfirmTitle,
            )}
            content={
              <div className="content">
                <FormattedMessage
                  id="Do you really want to delete the following groups?"
                  defaultMessage="Do you really want to delete the following groups?"
                />
                <ul className="content">
                  {map(this.state.selected, (item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            }
            onCancel={this.onDeleteCancel}
            onConfirm={this.onDeleteOk}
            size={null}
          />
          {this.state.showAddGroup ? (
            <ModalForm
              open={this.state.showAddGroup}
              className="modal"
              onSubmit={this.onAddGroupSubmit}
              submitError={this.state.addGroupError}
              onCancel={() => this.setState({ showAddGroup: false })}
              title={this.props.intl.formatMessage(messages.addGroupsFormTitle)}
              loading={this.props.createGroupRequest.loading}
              schema={{
                fieldsets: [
                  {
                    id: 'default',
                    title: 'FIXME: Group Data',
                    fields: [
                      'title',
                      'description',
                      'groupname',
                      'email',
                      'roles',
                    ],
                  },
                ],
                properties: {
                  title: {
                    title: this.props.intl.formatMessage(
                      messages.addGroupsFormTitleTitle,
                    ),
                    type: 'string',
                    description: '',
                  },
                  description: {
                    title: this.props.intl.formatMessage(
                      messages.addGroupsFormDescriptionTitle,
                    ),
                    type: 'string',
                    description: '',
                  },
                  groupname: {
                    title: this.props.intl.formatMessage(
                      messages.addGroupsFormGroupNameTitle,
                    ),
                    type: 'string',
                    description:
                      'A unique identifier for the group. Can not be changed after creation.',
                  },
                  email: {
                    title: this.props.intl.formatMessage(
                      messages.addGroupsFormEmailTitle,
                    ),
                    type: 'string',
                    description: '',
                    widget: 'email',
                  },
                  roles: {
                    title: this.props.intl.formatMessage(
                      messages.addGroupsFormRolesTitle,
                    ),
                    type: 'array',
                    choices: this.props.roles
                      .filter((role) => canAssignRole(isUserManager, role))
                      .map((role) => [role.id, role.title]),
                    noValueOption: false,
                    description: '',
                  },
                },
                required: ['groupname'],
              }}
            />
          ) : null}
        </div>
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage id="Groups" defaultMessage="Groups" />
          </Segment>
          <Segment secondary>
            <FormattedMessage
              id="Groups are logical collections of users, such as departments and business units. Groups are not directly related to permissions on a global level, you normally use Roles for that - and let certain Groups have a particular role. The symbol{plone_svg}indicates a role inherited from membership in another group."
              defaultMessage="Groups are logical collections of users, such as departments and business units. Groups are not directly related to permissions on a global level, you normally use Roles for that - and let certain Groups have a particular role. The symbol{plone_svg}indicates a role inherited from membership in another group."
              values={{
                plone_svg: (
                  <Icon name={groupSVG} size="20px" title={'plone-svg'} />
                ),
              }}
            />
          </Segment>
          <Segment>
            <Menu secondary attached>
              <Menu.Item position="left" style={{ width: '90%' }}>
                <Input
                  fluid
                  transparent
                  name="SearchableText"
                  placeholder={this.props.intl.formatMessage(
                    messages.searchGroups,
                  )}
                  size="large"
                  onChange={this.onChangeSearch}
                  id="group-search-input"
                />
                <Icon
                  name={zoomSVG}
                  size="28px"
                  color="#007eb1"
                  onClick={this.onSearchGroups}
                  className="zoom"
                />
              </Menu.Item>
              <Popup
                trigger={
                  <Menu.Item
                    icon
                    as={Button}
                    onClick={this.onDeleteSelected}
                    disabled={!this.state.selected.length > 0}
                  >
                    <Icon
                      name={deleteSVG}
                      size="24px"
                      color={
                        this.state.selected.length > 0 ? '#e40166' : 'grey'
                      }
                      className="delete"
                    />
                  </Menu.Item>
                }
                position="top center"
                content={this.props.intl.formatMessage(messages.delete)}
                size="mini"
              />
            </Menu>
          </Segment>
          <div className="table">
            <Table padded striped attached unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <Checkbox
                      checked={isSelectedAll ? true : false}
                      onChange={this.onSelectAll}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Groupname"
                      defaultMessage="Groupname"
                    />
                  </Table.HeaderCell>
                  {this.props.roles.map((role) => (
                    <Table.HeaderCell key={role.id}>{role.id}</Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body data-group="groups">
                {this.state.groupEntries
                  .slice(
                    this.state.currentPage * 10,
                    this.state.pageSize * (this.state.currentPage + 1),
                  )
                  .map((group) => (
                    <RenderGroups
                      key={group.id}
                      roles={this.props.roles}
                      group={group}
                      groups={this.props.groups}
                      selected={this.state.selected}
                      onChangeSelect={this.onChangeSelect}
                      updateGroups={this.updateGroupRole}
                    />
                  ))}
              </Table.Body>
            </Table>
          </div>
          <div className="contents-pagination">
            <Pagination
              current={this.state.currentPage}
              total={Math.ceil(
                this.state.groupEntries?.length / this.state.pageSize,
              )}
              onChangePage={this.onChangePage}
            />
          </div>
        </Segment.Group>
        {this.state.isClient &&
          createPortal(
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <>
                  <Button
                    id="toolbar-save"
                    className="save"
                    aria-label={this.props.intl.formatMessage(messages.save)}
                    onClick={this.updateGroupRoleSubmit}
                    loading={this.props.createGroupRequest.loading}
                  >
                    <Icon
                      name={saveSVG}
                      className="circled"
                      size="30px"
                      title={this.props.intl.formatMessage(messages.save)}
                    />
                  </Button>
                  <Link to="/controlpanel" className="cancel">
                    <Icon
                      name={clearSVG}
                      className="circled"
                      aria-label={this.props.intl.formatMessage(
                        messages.cancel,
                      )}
                      size="30px"
                      title={this.props.intl.formatMessage(messages.cancel)}
                    />
                  </Link>
                  <Button
                    id="toolbar-add"
                    aria-label={this.props.intl.formatMessage(
                      messages.addGroupsButtonTitle,
                    )}
                    onClick={() => {
                      this.setState({ showAddGroup: true });
                    }}
                    loading={this.props.createGroupRequest.loading}
                  >
                    <Icon
                      name={addUserSvg}
                      size="45px"
                      color="#826A6A"
                      title={this.props.intl.formatMessage(
                        messages.addGroupsButtonTitle,
                      )}
                    />
                  </Button>
                </>
              }
            />,
            document.getElementById('toolbar'),
          )}
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      user: state.users.user,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      roles: state.roles.roles,
      groups: state.groups.groups,
      description: state.description,
      many_users: state.controlpanels?.controlpanel?.data?.many_users,
      many_groups: state.controlpanels?.controlpanel?.data?.many_groups,
      pathname: props.location.pathname,
      deleteGroupRequest: state.groups.delete,
      createGroupRequest: state.groups.create,
      loadRolesRequest: state.roles,
    }),
    (dispatch) =>
      bindActionCreators(
        {
          listRoles,
          listGroups,
          deleteGroup,
          getControlpanel,
          createGroup,
          updateGroup,
          authenticatedRole,
          getUser,
        },
        dispatch,
      ),
  ),
)(GroupsControlpanel);
