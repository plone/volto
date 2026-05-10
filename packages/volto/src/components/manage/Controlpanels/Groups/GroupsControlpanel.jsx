/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/UsersControlpanel
 */
import {
  createGroup,
  deleteGroup,
  listGroups,
  updateGroup,
} from '@plone/volto/actions/groups/groups';
import { listRoles } from '@plone/volto/actions/roles/roles';
import { getControlpanel } from '@plone/volto/actions/controlpanels/controlpanels';
import { authenticatedRole } from '@plone/volto/actions/authRole/authRole';
import { getUser } from '@plone/volto/actions/users/users';
import jwtDecode from 'jwt-decode';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Pagination from '@plone/volto/components/theme/Pagination/Pagination';
import Error from '@plone/volto/components/theme/Error/Error';
import RenderGroups from '@plone/volto/components/manage/Controlpanels/Groups/RenderGroups';
import { ModalForm } from '@plone/volto/components/manage/Form';
import { Link, useLocation } from 'react-router-dom';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { messages } from '@plone/volto/helpers/MessageLabels/MessageLabels';
import { isManager, canAssignRole } from '@plone/volto/helpers/User/User';
import clearSVG from '@plone/volto/icons/clear.svg';
import addUserSvg from '@plone/volto/icons/add-user.svg';
import saveSVG from '@plone/volto/icons/save.svg';
import ploneSVG from '@plone/volto/icons/plone.svg';
import find from 'lodash/find';
import map from 'lodash/map';
import pull from 'lodash/pull';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import {
  Confirm,
  Container,
  Button,
  Form,
  Input,
  Loader,
  Segment,
  Table,
  Dimmer,
} from 'semantic-ui-react';

/**
 * GroupsControlpanel functional component.
 * @function GroupsControlpanel
 */
const GroupsControlpanel = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;

  const user = useSelector((state) => state.users.user);
  const userId = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : '',
  );
  const roles = useSelector((state) => state.roles.roles);
  const groups = useSelector((state) => state.groups.groups);
  const many_groups = useSelector(
    (state) => state.controlpanels?.controlpanel?.data?.many_groups,
  );
  const deleteGroupRequest = useSelector((state) => state.groups.delete);
  const createGroupRequest = useSelector((state) => state.groups.create);
  const loadRolesRequest = useSelector((state) => state.roles);
  const inheritedRole = useSelector(
    (state) => state.authRole.authenticatedRole,
  );

  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addGroupError, setAddGroupError] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState(undefined);
  const [showAddGroup, setShowAddGroup] = useState(false);
  const [groupEntries, setGroupEntries] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const [authenticatedRoleState, setAuthenticatedRoleState] = useState(
    inheritedRole || [],
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);
  const [error, setError] = useState(undefined);
  const addGroupSetFormDataCallbackRef = useRef(undefined);

  const handleListRoles = useCallback(() => dispatch(listRoles()), [dispatch]);
  const handleListGroups = useCallback(
    (searchText) => dispatch(listGroups(searchText)),
    [dispatch],
  );
  const handleDeleteGroup = useCallback(
    (id) => dispatch(deleteGroup(id)),
    [dispatch],
  );
  const handleGetControlpanel = useCallback(
    (id) => dispatch(getControlpanel(id)),
    [dispatch],
  );
  const handleCreateGroup = useCallback(
    (data) => dispatch(createGroup(data)),
    [dispatch],
  );
  const handleUpdateGroup = useCallback(
    (id, data) => dispatch(updateGroup(id, data)),
    [dispatch],
  );
  const handleAuthenticatedRole = useCallback(
    (roles) => dispatch(authenticatedRole(roles)),
    [dispatch],
  );
  const handleGetUser = useCallback((id) => dispatch(getUser(id)), [dispatch]);

  const fetchData = useCallback(async () => {
    await handleGetControlpanel('usergroup');
    await handleListRoles();
    if (!many_groups) {
      await handleListGroups();
      setGroupEntries(groups);
    }
    await handleGetUser(userId);
  }, [
    handleGetControlpanel,
    handleListRoles,
    handleListGroups,
    handleGetUser,
    many_groups,
    groups,
    userId,
  ]);

  useEffect(() => {
    setIsClient(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setGroupEntries(groups);
  }, [groups]);

  useEffect(() => {
    setAuthenticatedRoleState(inheritedRole || []);
  }, [inheritedRole]);

  const getGroupFromProps = useCallback(
    (value) => {
      return find(groups, ['@id', value]);
    },
    [groups],
  );

  /**
   * @param {*} event Event object
   * @returns {undefined}
   */
  const onSearchGroups = useCallback(
    (event) => {
      setIsLoading(true);
      event.preventDefault();
      handleListGroups(search)
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          // eslint-disable-next-line no-console
          console.error('Error searching group', error);
        });
    },
    [search, handleListGroups],
  );

  /**
   * On change search handler
   * @param {object} event Event object.
   * @returns {undefined}
   */
  const onChangeSearch = useCallback((event) => {
    setSearch(event.target.value);
  }, []);

  /**
   * @param {*} event Event object.
   * @param {*} { value } id (groupname)
   * @returns {undefined}
   */
  const deleteGroupHandler = useCallback(
    (event, { value }) => {
      if (value) {
        setShowDelete(true);
        setGroupToDelete(getGroupFromProps(value));
      }
    },
    [getGroupFromProps],
  );

  /**
   * On delete ok
   * @returns {undefined}
   */
  const onDeleteOk = useCallback(() => {
    if (groupToDelete) {
      handleDeleteGroup(groupToDelete.id);
    }
  }, [groupToDelete, handleDeleteGroup]);

  /**
   * On delete cancel
   * @returns {undefined}
   */
  const onDeleteCancel = useCallback(() => {
    setShowDelete(false);
    setGroupToDelete(undefined);
  }, []);

  /**
   * @param {*} name
   * @param {*} value
   */
  const updateGroupRole = useCallback((name, value) => {
    setGroupEntries((prevEntries) =>
      map(prevEntries, (entry) => ({
        ...entry,
        roles:
          entry.id === name && !entry.roles.includes(value)
            ? [...entry.roles, value]
            : entry.id !== name
              ? entry.roles
              : pull(entry.roles, value),
      })),
    );
    setAuthenticatedRoleState((prevState) =>
      name === 'AuthenticatedUsers' && !prevState.includes(value)
        ? [...prevState, value]
        : name !== 'AuthenticatedUsers'
          ? prevState
          : pull([...prevState], value),
    );
  }, []);

  /**
   * @param {*} e
   */
  const updateGroupRoleSubmit = useCallback(
    (e) => {
      e.stopPropagation();
      groupEntries.forEach((item) => {
        handleUpdateGroup(item.id, item);
      });
      handleAuthenticatedRole(authenticatedRoleState);
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.updateGroups)}
        />,
      );
    },
    [
      groupEntries,
      authenticatedRoleState,
      handleUpdateGroup,
      handleAuthenticatedRole,
      intl,
    ],
  );

  /**
   * @param {object} data Form data from the ModalForm.
   * @param {func} callback to set new form data in the ModalForm
   * @returns {undefined}
   */
  const onAddGroupSubmit = useCallback(
    (data, callback) => {
      handleCreateGroup(data);
      addGroupSetFormDataCallbackRef.current = callback;
    },
    [handleCreateGroup],
  );

  /**
   * Handle Errors after createGroup()
   * @param {*} error object. Requires the property .message
   * @returns {undefined}
   */
  const onAddGroupError = useCallback((error) => {
    setAddGroupError(error.response.body.message);
  }, []);

  /**
   * Handle Success after createGroup()
   * @returns {undefined}
   */
  const onAddGroupSuccess = useCallback(() => {
    if (addGroupSetFormDataCallbackRef.current) {
      addGroupSetFormDataCallbackRef.current({});
    }
    setShowAddGroup(false);
    setAddGroupError(undefined);
    addGroupSetFormDataCallbackRef.current = undefined;
    toast.success(
      <Toast
        success
        title={intl.formatMessage(messages.success)}
        content={intl.formatMessage(messages.groupCreated)}
      />,
    );
  }, [intl]);

  /**
   * Handle Success after deleteGroup()
   * @returns {undefined}
   */
  const onDeleteGroupSuccess = useCallback(() => {
    setGroupToDelete(undefined);
    setShowDelete(false);
    toast.success(
      <Toast
        success
        title={intl.formatMessage(messages.success)}
        content={intl.formatMessage(messages.groupDeleted)}
      />,
    );
  }, [intl]);

  const prevDeleteGroupRequestRef = useRef(deleteGroupRequest);
  const prevCreateGroupRequestRef = useRef(createGroupRequest);
  const prevLoadRolesRequestRef = useRef(loadRolesRequest);

  useEffect(() => {
    const prevDeleteGroupRequest = prevDeleteGroupRequestRef.current;
    const prevCreateGroupRequest = prevCreateGroupRequestRef.current;
    const prevLoadRolesRequest = prevLoadRolesRequestRef.current;

    if (
      (prevDeleteGroupRequest.loading && deleteGroupRequest.loaded) ||
      (prevCreateGroupRequest.loading && createGroupRequest.loaded)
    ) {
      handleListGroups(search);
    }
    if (prevDeleteGroupRequest.loading && deleteGroupRequest.loaded) {
      onDeleteGroupSuccess();
    }
    if (prevCreateGroupRequest.loading && createGroupRequest.loaded) {
      onAddGroupSuccess();
    }
    if (prevCreateGroupRequest.loading && createGroupRequest.error) {
      onAddGroupError(createGroupRequest.error);
    }
    if (prevLoadRolesRequest.loading && loadRolesRequest.error) {
      setError(loadRolesRequest.error);
    }

    prevDeleteGroupRequestRef.current = deleteGroupRequest;
    prevCreateGroupRequestRef.current = createGroupRequest;
    prevLoadRolesRequestRef.current = loadRolesRequest;
  }, [
    deleteGroupRequest,
    createGroupRequest,
    loadRolesRequest,
    search,
    handleListGroups,
    onDeleteGroupSuccess,
    onAddGroupSuccess,
    onAddGroupError,
  ]);

  /**
   * On change page
   * @param {object} event Event object.
   * @param {string} value Page value.
   * @returns {undefined}
   */
  const onChangePage = useCallback((event, { value }) => {
    setCurrentPage(value);
  }, []);

  if (error) {
    return <Error error={error} />;
  }

  const groupNameToDelete = groupToDelete ? groupToDelete.id : '';
  const isUserManager = isManager(user);

  return (
    <Container className="users-control-panel">
      <Helmet title={intl.formatMessage(messages.groups)} />
      <div className="container">
        <Confirm
          open={showDelete}
          header={intl.formatMessage(messages.deleteGroupConfirmTitle)}
          content={
            <div className="content">
              <Dimmer active={deleteGroupRequest?.loading}>
                <Loader>
                  <FormattedMessage id="Loading" defaultMessage="Loading." />
                </Loader>
              </Dimmer>

              <ul className="content">
                <FormattedMessage
                  id="Do you really want to delete the group {groupname}?"
                  defaultMessage="Do you really want to delete the group {groupname}?"
                  values={{
                    groupname: <b>{groupNameToDelete}</b>,
                  }}
                />
              </ul>
            </div>
          }
          onCancel={onDeleteCancel}
          onConfirm={onDeleteOk}
          size={null}
        />
        {showAddGroup ? (
          <ModalForm
            open={showAddGroup}
            className="modal"
            onSubmit={onAddGroupSubmit}
            submitError={addGroupError}
            onCancel={() => setShowAddGroup(false)}
            title={intl.formatMessage(messages.addGroupsFormTitle)}
            loading={createGroupRequest.loading}
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
                  title: intl.formatMessage(messages.addGroupsFormTitleTitle),
                  type: 'string',
                  description: '',
                },
                description: {
                  title: intl.formatMessage(
                    messages.addGroupsFormDescriptionTitle,
                  ),
                  type: 'string',
                  description: '',
                },
                groupname: {
                  title: intl.formatMessage(
                    messages.addGroupsFormGroupNameTitle,
                  ),
                  type: 'string',
                  description: intl.formatMessage(
                    messages.addGroupsFormGroupNameDescription,
                  ),
                },
                email: {
                  title: intl.formatMessage(messages.addGroupsFormEmailTitle),
                  type: 'string',
                  description: '',
                  widget: 'email',
                },
                roles: {
                  title: intl.formatMessage(messages.addGroupsFormRolesTitle),
                  type: 'array',
                  choices: roles
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
          <Form onSubmit={onSearchGroups}>
            <Form.Field>
              <Input
                name="SearchableText"
                action={{
                  icon: 'search',
                  loading: isLoading,
                  disabled: isLoading,
                }}
                placeholder={intl.formatMessage(messages.searchGroups)}
                onChange={onChangeSearch}
                id="group-search-input"
              />
            </Form.Field>
          </Form>
        </Segment>
        <Form>
          <div className="table">
            {((many_groups && groupEntries.length > 0) || !many_groups) && (
              <Table padded striped attached unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <FormattedMessage
                        id="Groupname"
                        defaultMessage="Groupname"
                      />
                    </Table.HeaderCell>
                    {roles.map((role) => (
                      <Table.HeaderCell key={role.id}>
                        {role.title}
                      </Table.HeaderCell>
                    ))}
                    <Table.HeaderCell>
                      <FormattedMessage id="Actions" defaultMessage="Actions" />
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body data-group="groups">
                  {groupEntries
                    .slice(currentPage * 10, pageSize * (currentPage + 1))
                    .map((group) => (
                      <RenderGroups
                        key={group.id}
                        onDelete={deleteGroupHandler}
                        roles={roles}
                        group={group}
                        updateGroups={updateGroupRole}
                        inheritedRole={authenticatedRoleState}
                        isUserManager={isUserManager}
                      />
                    ))}
                </Table.Body>
              </Table>
            )}
            {groupEntries.length === 0 && search && (
              <Segment>
                {intl.formatMessage(messages.groupSearchNoResults)}
              </Segment>
            )}
          </div>
          <div className="contents-pagination">
            <Pagination
              current={currentPage}
              total={Math.ceil(groupEntries?.length / pageSize)}
              onChangePage={onChangePage}
            />
          </div>
        </Form>
      </Segment.Group>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Button
                  id="toolbar-save"
                  className="save"
                  aria-label={intl.formatMessage(messages.save)}
                  onClick={updateGroupRoleSubmit}
                  loading={createGroupRequest.loading}
                >
                  <Icon
                    name={saveSVG}
                    className="circled"
                    size="30px"
                    title={intl.formatMessage(messages.save)}
                  />
                </Button>
                <Link to="/controlpanel" className="cancel">
                  <Icon
                    name={clearSVG}
                    className="circled"
                    aria-label={intl.formatMessage(messages.cancel)}
                    size="30px"
                    title={intl.formatMessage(messages.cancel)}
                  />
                </Link>
                <Button
                  id="toolbar-add"
                  aria-label={intl.formatMessage(messages.addGroupsButtonTitle)}
                  onClick={() => {
                    setShowAddGroup(true);
                  }}
                  loading={createGroupRequest.loading}
                >
                  <Icon
                    name={addUserSvg}
                    size="45px"
                    color="#826A6A"
                    title={intl.formatMessage(messages.addGroupsButtonTitle)}
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

export default GroupsControlpanel;
