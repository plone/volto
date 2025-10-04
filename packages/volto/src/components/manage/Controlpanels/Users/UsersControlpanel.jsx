/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/UsersControlpanel
 */
import {
  createUser,
  deleteUser,
  listUsers,
  updateUser,
  getUser,
} from '@plone/volto/actions/users/users';
import { listRoles } from '@plone/volto/actions/roles/roles';
import { listGroups, updateGroup } from '@plone/volto/actions/groups/groups';
import { getControlpanel } from '@plone/volto/actions/controlpanels/controlpanels';
import { getUserSchema } from '@plone/volto/actions/userschema/userschema';
import jwtDecode from 'jwt-decode';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Pagination from '@plone/volto/components/theme/Pagination/Pagination';
import Error from '@plone/volto/components/theme/Error/Error';
import { ModalForm } from '@plone/volto/components/manage/Form';
import RenderUsers from '@plone/volto/components/manage/Controlpanels/Users/RenderUsers';
import { Link } from 'react-router-dom';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { messages } from '@plone/volto/helpers/MessageLabels/MessageLabels';
import { isManager, canAssignGroup } from '@plone/volto/helpers/User/User';
import clearSVG from '@plone/volto/icons/clear.svg';
import addUserSvg from '@plone/volto/icons/add-user.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import find from 'lodash/find';
import map from 'lodash/map';
import pull from 'lodash/pull';
import difference from 'lodash/difference';
import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { connect, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { bindActionCreators, compose } from 'redux';
import {
  Confirm,
  Container,
  Form,
  Input,
  Button,
  Dimmer,
  Segment,
  Table,
  Loader,
} from 'semantic-ui-react';

/**
 * UsersControlpanel functional component.
 * @function UsersControlpanel
 */
const UsersControlpanel = (props) => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [addUserError, setAddUserError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(undefined);
  const [entries, setEntries] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  // eslint-disable-next-line no-unused-vars
  const [loginUsingEmail, setLoginUsingEmail] = useState(false); // Reserved for future use to disable username field when email login is enabled
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    await props.getControlpanel('usergroup');
    await props.listRoles();
    if (!props.many_users) {
      props.listGroups();
      await props.listUsers();
      setEntries(props.users);
    }
    await props.getUserSchema();
    await props.getUser(props.userId);
  }, [props]);

  /**
   * Check login using email status from security control panel
   * @method checkLoginUsingEmailStatus
   * @returns {undefined}
   */
  const checkLoginUsingEmailStatus = useCallback(async () => {
    try {
      await props.getControlpanel('security');
      if (props.controlPanelData?.data?.use_email_as_login) {
        setLoginUsingEmail(props.controlPanelData.data.use_email_as_login);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching security control panel', error);
    }
  }, [props]);

  const getUserFromProps = useCallback(
    (value) => {
      return find(props.users, ['@id', value]);
    },
    [props.users],
  );

  /**
   * Search handler
   * @method onSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  const onSearch = useCallback(
    (event) => {
      event.preventDefault();
      setIsLoading(true);
      props
        .listUsers({
          search: search,
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          // eslint-disable-next-line no-console
          console.error('Error searching users', error);
        });
    },
    [props, search],
  );

  /**
   * On change search handler
   * @method onChangeSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  /**
   * Delete a user
   * @method delete
   * @param {object} event Event object.
   * @param {string} value username.
   * @returns {undefined}
   */
  const deleteUser = useCallback(
    (event, { value }) => {
      if (value) {
        setShowDelete(true);
        setUserToDelete(getUserFromProps(value));
      }
    },
    [getUserFromProps],
  );

  /**
   * On delete ok
   * @method onDeleteOk
   * @returns {undefined}
   */
  const onDeleteOk = useCallback(() => {
    if (userToDelete) {
      const deleteUserAction = props.deleteUser(userToDelete.id);
      if (deleteUserAction && typeof deleteUserAction.then === 'function') {
        deleteUserAction
          .then(() => {
            // Handle success
            setUserToDelete(undefined);
            setShowDelete(false);

            // Refresh users list
            props.listUsers({ search: search });

            // Show success message
            toast.success(
              <Toast
                success
                title={props.intl.formatMessage(messages.success)}
                content={props.intl.formatMessage(messages.userDeleted)}
              />,
            );
          })
          .catch((error) => {
            // Handle error
            // eslint-disable-next-line no-console
            console.error('Error deleting user', error);
          });
      }
    }
  }, [userToDelete, props, search]);

  /**
   * On delete cancel
   * @method onDeleteCancel
   * @returns {undefined}
   */
  const onDeleteCancel = () => {
    setShowDelete(false);
    setUserToDelete(undefined);
  };

  /**
   *@param {object} user
   *@returns {undefined}
   *@memberof UsersControlpanel
   */
  const addUserToGroup = useCallback(
    (user) => {
      const { groups, username } = user;
      groups.forEach((group) => {
        props.updateGroup(group, {
          users: {
            [username]: true,
          },
        });
      });
    },
    [props],
  );

  /**
   * Callback to be called by the ModalForm when the form is submitted.
   *
   * @param {object} data Form data from the ModalForm.
   * @param {func} callback to set new form data in the ModalForm
   * @returns {undefined}
   */
  const onAddUserSubmit = useCallback(
    (data, callback) => {
      const { groups, sendPasswordReset, password } = data;
      if (
        sendPasswordReset !== undefined &&
        sendPasswordReset === true &&
        password !== undefined
      ) {
        toast.error(
          <Toast
            error
            title={props.intl.formatMessage(messages.error)}
            content={props.intl.formatMessage(
              messages.addUserFormPasswordAndSendPasswordTogetherNotAllowed,
            )}
          />,
        );
      } else {
        if (groups && groups.length > 0) addUserToGroup(data);

        const createUserAction = createUser(data, sendPasswordReset);
        dispatch(createUserAction)
          .then(() => {
            // Handle success
            if (callback) {
              callback({});
            }
            setShowAddUser(false);
            setAddUserError(undefined);

            // Refresh users list
            props.listUsers({ search: search });

            // Show success message
            toast.success(
              <Toast
                success
                title={props.intl.formatMessage(messages.success)}
                content={props.intl.formatMessage(messages.userCreated)}
              />,
            );
          })
          .catch((error) => {
            // Handle error
            setAddUserError(
              error.response?.body?.error?.message || 'Error creating user',
            );
          });
      }
    },
    [props, addUserToGroup, dispatch, search],
  );

  /**
   * Update user role
   * @param {*} name
   * @param {*} value
   */
  const updateUserRole = useCallback(
    (name, value) => {
      setEntries(
        map(entries, (entry) => ({
          ...entry,
          roles:
            entry.id === name && !entry.roles.includes(value)
              ? [...entry.roles, value]
              : entry.id !== name
                ? entry.roles
                : pull(entry.roles, value),
        })),
      );
    },
    [entries],
  );

  /**
   * Update user role submit
   * @param {*} event
   */
  const updateUserRoleSubmit = useCallback(
    (e) => {
      e.stopPropagation();

      const roles = props.roles.map((item) => item.id);
      entries.forEach((item) => {
        const userData = { roles: {} };
        const removedRoles = difference(roles, item.roles);

        removedRoles.forEach((role) => {
          userData.roles[role] = false;
        });
        item.roles.forEach((role) => {
          userData.roles[role] = true;
        });
        props.updateUser(item.id, userData);
      });
      toast.success(
        <Toast
          success
          title={props.intl.formatMessage(messages.success)}
          content={props.intl.formatMessage(messages.updateRoles)}
        />,
      );
    },
    [props, entries],
  );

  /**
   * Handle Errors after createUser()
   *
   * @param {object} error object. Requires the property .message
   * @returns {undefined}
   */
  const onAddUserError = useCallback((error) => {
    setAddUserError(error.response.body.error.message);
  }, []);

  /**
   * On change page
   * @method onChangePage
   * @param {object} event Event object.
   * @param {string} value Page value.
   * @returns {undefined}
   */
  const onChangePage = (event, { value }) => {
    setCurrentPage(value);
  };

  /**
   * Filters the roles a user can assign when adding a user.
   * @method canAssignAdd
   * @returns {arry}
   */
  const canAssignAdd = useCallback(
    (isManager) => {
      if (isManager) return props.roles;
      return props.user?.roles
        ? props.roles.filter((role) => props.user.roles.includes(role.id))
        : [];
    },
    [props.roles, props.user],
  );

  useEffect(() => {
    setIsClient(true);
    fetchData();
    checkLoginUsingEmailStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setEntries(props.users);
  }, [props.users]);

  useEffect(() => {
    if (props.createRequest?.error && !props.createRequest?.loading) {
      onAddUserError(props.createRequest.error);
    }
  }, [
    props.createRequest?.error,
    props.createRequest?.loading,
    onAddUserError,
  ]);

  useEffect(() => {
    if (props.loadRolesRequest?.error && !props.loadRolesRequest?.loading) {
      setError(props.loadRolesRequest.error);
    }
  }, [props.loadRolesRequest?.error, props.loadRolesRequest?.loading]);

  if (error) {
    return <Error error={error} />;
  }

  const usernameToDelete = userToDelete ? userToDelete.username : '';

  // Copy the userschema using JSON serialization/deserialization
  // this is really ugly, but if we don't do this the original value
  // of the userschema is changed and it is used like that through
  // the lifecycle of the application
  let adduserschema = {};
  let isUserManager = false;
  if (props?.userschema?.loaded) {
    isUserManager = isManager(props.user);
    adduserschema = JSON.parse(JSON.stringify(props?.userschema?.userschema));

    // Add custom form fields to the schema
    adduserschema.properties.username = {
      title: props.intl.formatMessage(messages.addUserFormUsernameTitle),
      type: 'string',
      description: props.intl.formatMessage(
        messages.addUserFormUsernameDescription,
      ),
    };

    adduserschema.properties.password = {
      title: props.intl.formatMessage(messages.addUserFormPasswordTitle),
      type: 'password',
      description: props.intl.formatMessage(
        messages.addUserFormPasswordDescription,
      ),
      widget: 'password',
    };

    adduserschema.properties.sendPasswordReset = {
      title: props.intl.formatMessage(
        messages.addUserFormSendPasswordResetTitle,
      ),
      type: 'boolean',
    };

    adduserschema.properties.roles = {
      title: props.intl.formatMessage(messages.addUserFormRolesTitle),
      type: 'array',
      choices: canAssignAdd(isUserManager).map((role) => [role.id, role.title]),
      noValueOption: false,
    };

    adduserschema.properties.groups = {
      title: props.intl.formatMessage(messages.addUserGroupNameTitle),
      type: 'array',
      choices: props.groups
        .filter((group) => canAssignGroup(isUserManager, group))
        .map((group) => [group.id, group.id]),
      noValueOption: false,
    };
    // Add custom fields to the first fieldset if they don't already exist
    if (
      adduserschema.fieldsets &&
      adduserschema.fieldsets.length > 0 &&
      !adduserschema.fieldsets[0].fields.includes('username')
    ) {
      adduserschema.fieldsets[0].fields =
        adduserschema.fieldsets[0].fields.concat([
          'username',
          'password',
          'sendPasswordReset',
          'roles',
          'groups',
        ]);
    }
  }

  return (
    <Container className="users-control-panel">
      <Helmet title={props.intl.formatMessage(messages.users)} />
      <div className="container">
        <Confirm
          open={showDelete}
          header={props.intl.formatMessage(messages.deleteUserConfirmTitle)}
          content={
            <div className="content">
              <Dimmer active={props?.deleteRequest?.loading}>
                <Loader>
                  <FormattedMessage id="Loading" defaultMessage="Loading." />
                </Loader>
              </Dimmer>

              <ul className="content">
                <FormattedMessage
                  id="Do you really want to delete the user {username}?"
                  defaultMessage="Do you really want to delete the user {username}?"
                  values={{
                    username: <b>{usernameToDelete}</b>,
                  }}
                />
              </ul>
            </div>
          }
          onCancel={onDeleteCancel}
          onConfirm={onDeleteOk}
          size={null}
        />
        {props?.userschema?.loaded && showAddUser ? (
          <ModalForm
            open={showAddUser}
            className="modal"
            onSubmit={onAddUserSubmit}
            submitError={addUserError}
            onCancel={() => {
              setShowAddUser(false);
              setAddUserError(undefined);
            }}
            title={props.intl.formatMessage(messages.addUserFormTitle)}
            loading={props.createRequest?.loading}
            schema={adduserschema}
          />
        ) : null}
      </div>
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage id="Users" defaultMessage="Users" />
        </Segment>
        <Segment secondary>
          <FormattedMessage
            id="Note that roles set here apply directly to a user. The symbol{plone_svg}indicates a role inherited from membership in a group."
            defaultMessage="Note that roles set here apply directly to a user. The symbol{plone_svg}indicates a role inherited from membership in a group."
            values={{
              plone_svg: (
                <Icon
                  name={ploneSVG}
                  size="20px"
                  color="#007EB1"
                  title={'plone-svg'}
                />
              ),
            }}
          />
        </Segment>
        <Segment>
          <Form onSubmit={onSearch}>
            <Form.Field>
              <Input
                name="SearchableText"
                action={{
                  icon: 'search',
                  loading: isLoading,
                  disabled: isLoading,
                }}
                placeholder={props.intl.formatMessage(messages.searchUsers)}
                onChange={onChangeSearch}
                id="user-search-input"
              />
            </Form.Field>
          </Form>
        </Segment>
        <Form>
          {((props.many_users && entries.length > 0) || !props.many_users) && (
            <Table padded striped attached unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="User name"
                      defaultMessage="User name"
                    />
                  </Table.HeaderCell>
                  {props.roles.map((role) => (
                    <Table.HeaderCell key={role.id}>
                      {role.title}
                    </Table.HeaderCell>
                  ))}
                  <Table.HeaderCell>
                    <FormattedMessage id="Actions" defaultMessage="Actions" />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body data-user="users">
                {entries
                  .slice(currentPage * 10, pageSize * (currentPage + 1))
                  .map((user) => (
                    <RenderUsers
                      key={user.id}
                      onDelete={deleteUser}
                      roles={props.roles}
                      user={user}
                      updateUser={updateUserRole}
                      inheritedRole={props.inheritedRole}
                      userschema={props.userschema}
                      listUsers={props.listUsers}
                      isUserManager={isUserManager}
                    />
                  ))}
              </Table.Body>
            </Table>
          )}
          {entries.length === 0 && search && (
            <Segment>
              {props.intl.formatMessage(messages.userSearchNoResults)}
            </Segment>
          )}
          <div className="contents-pagination">
            <Pagination
              current={currentPage}
              total={Math.ceil(entries?.length / pageSize)}
              onChangePage={onChangePage}
            />
          </div>
        </Form>
      </Segment.Group>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={props.pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Button
                  id="toolbar-save"
                  className="save"
                  aria-label={props.intl.formatMessage(messages.save)}
                  onClick={updateUserRoleSubmit}
                  loading={props.createRequest?.loading}
                >
                  <Icon
                    name={saveSVG}
                    className="circled"
                    size="30px"
                    title={props.intl.formatMessage(messages.save)}
                  />
                </Button>
                <Link to="/controlpanel" className="cancel">
                  <Icon
                    name={clearSVG}
                    className="circled"
                    aria-label={props.intl.formatMessage(messages.cancel)}
                    size="30px"
                    title={props.intl.formatMessage(messages.cancel)}
                  />
                </Link>
                <Button
                  id="toolbar-add"
                  aria-label={props.intl.formatMessage(
                    messages.addUserButtonTitle,
                  )}
                  onClick={() => {
                    setShowAddUser(true);
                  }}
                  loading={props.createRequest?.loading}
                >
                  <Icon
                    name={addUserSvg}
                    size="45px"
                    color="#826A6A"
                    title={props.intl.formatMessage(
                      messages.addUserButtonTitle,
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
};

UsersControlpanel.propTypes = {
  listRoles: PropTypes.func.isRequired,
  listUsers: PropTypes.func.isRequired,
  listGroups: PropTypes.func.isRequired,
  getControlpanel: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  createUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired,
  getUserSchema: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  intl: PropTypes.object.isRequired,
  roles: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      '@type': PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      id: PropTypes.string,
      username: PropTypes.string,
      fullname: PropTypes.string,
      roles: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
  groups: PropTypes.arrayOf(
    PropTypes.shape({
      '@id': PropTypes.string,
      id: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
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
  }),
  userschema: PropTypes.shape({
    properties: PropTypes.object,
    fieldsets: PropTypes.array,
    loaded: PropTypes.bool,
  }),
  deleteRequest: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.object,
  }),
  createRequest: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.object,
  }),
  loadRolesRequest: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
    error: PropTypes.object,
  }),
  many_users: PropTypes.bool,
  inheritedRole: PropTypes.arrayOf(PropTypes.string),
};

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      roles: state.roles.roles,
      users: state.users.users,
      user: state.users.user,
      userId: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
      groups: state.groups.groups,
      many_users: state.controlpanels?.controlpanel?.data?.many_users,
      many_groups: state.controlpanels?.controlpanel?.data?.many_groups,
      description: state.description,
      pathname: props.location.pathname,
      deleteRequest: state.users.delete,
      createRequest: state.users.create,
      loadRolesRequest: state.roles,
      inheritedRole: state.authRole.authenticatedRole,
      userschema: state.userschema,
      controlPanelData: state.controlpanels?.controlpanel,
    }),
    (dispatch) =>
      bindActionCreators(
        {
          listRoles,
          listUsers,
          listGroups,
          getControlpanel,
          deleteUser,
          createUser,
          updateUser,
          updateGroup,
          getUserSchema,
          getUser,
        },
        dispatch,
      ),
  ),
)(UsersControlpanel);
