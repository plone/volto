import { useState, useEffect } from 'react';
import { Plug, Pluggable } from '@plone/volto/components/manage/Pluggable';
import { Helmet } from '@plone/volto/helpers';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { find, isEqual, map } from 'lodash';
import { Portal } from 'react-portal';
import {
  Button,
  Checkbox,
  Container as SemanticContainer,
  Form,
  Icon as IconOld,
  Input,
  Segment,
  Table,
} from 'semantic-ui-react';

import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { updateSharing, getSharing } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import { Icon, Toolbar, Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';
import config from '@plone/volto/registry';
import { useContent } from '@plone/volto/hooks/content/useContent';
import { useSharing } from '@plone/volto/hooks/sharing/useSharing';
import { useToken } from '@plone/volto/hooks/userSession/useToken';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  searchForUserOrGroup: {
    id: 'Search for user or group',
    defaultMessage: 'Search for user or group',
  },
  inherit: {
    id: 'Inherit permissions from higher levels',
    defaultMessage: 'Inherit permissions from higher levels',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  sharing: {
    id: 'Sharing',
    defaultMessage: 'Sharing',
  },
  user: {
    id: 'User',
    defaultMessage: 'User',
  },
  group: {
    id: 'Group',
    defaultMessage: 'Group',
  },
  globalRole: {
    id: 'Global role',
    defaultMessage: 'Global role',
  },
  inheritedValue: {
    id: 'Inherited value',
    defaultMessage: 'Inherited value',
  },
  permissionsUpdated: {
    id: 'Permissions updated',
    defaultMessage: 'Permissions updated',
  },
  permissionsUpdatedSuccessfully: {
    id: 'Permissions have been updated successfully',
    defaultMessage: 'Permissions have been updated successfully',
  },
});

const SharingComponent = (props) => {
  const { title } = useContent();
  const { login } = useToken();
  const {
    entries: props_entries,
    inherit: props_inherit,
    available_roles,
    updateRequest,
  } = useSharing();
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [inherit, setInherit] = useState(props_inherit);
  const [isClient, setIsClient] = useState(false);
  const [entries, setEntries] = useState(props_entries);
  const pathname = props.location.pathname;

  useEffect(() => {
    dispatch(getSharing(getBaseUrl(pathname), search));
    setIsClient(true);
  }, [dispatch, pathname, search, isClient]);

  useEffect(() => {
    dispatch(getSharing(getBaseUrl(pathname), search));
    toast.success(
      <Toast
        success
        title={intl.formatMessage(messages.permissionsUpdated)}
        content={intl.formatMessage(messages.permissionsUpdatedSuccessfully)}
      />,
    );
  }, [
    dispatch,
    intl,
    pathname,
    search,
    updateRequest.loaded,
    updateRequest.loading,
  ]);

  useEffect(() => {
    map(props_entries, (entry) => {
      const values = find(entries, { id: entry.id });
      return {
        ...entry,
        roles: values ? values.roles : entry.roles,
      };
    });
  }, [props_entries, entries]);

  useEffect(() => {
    setInherit(props_inherit === null ? inherit : props_inherit);
    setEntries(entries);
  }, [props_inherit, inherit, entries]);

  const onSubmit = (event) => {
    const data = { entries: [] };
    event.preventDefault();
    if (props_inherit !== inherit) {
      data.inherit = inherit;
    }
    for (let i = 0; i < props_entries.length; i += 1) {
      if (!isEqual(props_entries[i].roles, entries[i].roles)) {
        data.entries.push({
          id: entries[i].id,
          type: entries[i].type,
          roles: entries[i].roles,
        });
      }
    }
    dispatch(updateSharing(getBaseUrl(pathname), data));
  };

  const onSearch = (event) => {
    event.preventDefault();
    dispatch(getSharing(getBaseUrl(pathname), search));
  };

  const onChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const onToggleInherit = () => {
    setInherit(!inherit);
  };

  const onChange = (event, { value }) => {
    const [principal, role] = value.split(':');
    setEntries(
      map(entries, (entry) => ({
        ...entry,
        roles:
          entry.id === principal
            ? {
                ...entry.roles,
                [role]: !entry.roles[role],
              }
            : entry.roles,
      })),
    );
  };

  const onCancel = () => {
    history.push(getBaseUrl(pathname));
  };

  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  return (
    <Container id="page-sharing">
      <Helmet title={intl.formatMessage(messages.sharing)} />
      <Segment.Group raised>
        <Pluggable name="sharing-component" />
        <Plug pluggable="sharing-component" id="sharing-component-title">
          <Segment className="primary">
            <FormattedMessage
              id="Sharing for {title}"
              defaultMessage="Sharing for {title}"
              values={{ title: <q>{title}</q> }}
            />
          </Segment>
        </Plug>
        <Plug pluggable="sharing-component" id="sharing-component-description">
          <Segment secondary>
            <FormattedMessage
              id="You can control who can view and edit your item using the list below."
              defaultMessage="You can control who can view and edit your item using the list below."
            />
          </Segment>
        </Plug>
        <Plug pluggable="sharing-component" id="sharing-component-search">
          <Segment>
            <Form onSubmit={onSearch}>
              <Form.Field>
                <Input
                  name="SearchableText"
                  action={{ icon: 'search' }}
                  placeholder={intl.formatMessage(
                    messages.searchForUserOrGroup,
                  )}
                  onChange={onChangeSearch}
                />
              </Form.Field>
            </Form>
          </Segment>
        </Plug>
        <Plug
          pluggable="sharing-component"
          id="sharing-component-form"
          dependencies={[entries, available_roles]}
        >
          <Form onSubmit={onSubmit}>
            <Table celled padded striped attached>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <FormattedMessage id="Name" defaultMessage="Name" />
                  </Table.HeaderCell>
                  {available_roles?.map((role) => (
                    <Table.HeaderCell key={role.id}>
                      {role.title}
                    </Table.HeaderCell>
                  ))}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {entries?.map((entry) => (
                  <Table.Row key={entry.id}>
                    <Table.Cell>
                      <IconOld
                        name={entry.type === 'user' ? 'user' : 'users'}
                        title={
                          entry.type === 'user'
                            ? intl.formatMessage(messages.user)
                            : intl.formatMessage(messages.group)
                        }
                      />{' '}
                      {entry.title}
                      {entry.login && ` (${entry.login})`}
                    </Table.Cell>
                    {available_roles?.map((role) => (
                      <Table.Cell key={role.id}>
                        {entry.roles[role.id] === 'global' && (
                          <IconOld
                            name="check circle outline"
                            title={intl.formatMessage(messages.globalRole)}
                            color="blue"
                          />
                        )}
                        {entry.roles[role.id] === 'acquired' && (
                          <IconOld
                            name="check circle outline"
                            color="green"
                            title={intl.formatMessage(messages.inheritedValue)}
                          />
                        )}
                        {typeof entry.roles[role.id] === 'boolean' && (
                          <Checkbox
                            onChange={onChange}
                            value={`${entry.id}:${role.id}`}
                            checked={entry.roles[role.id]}
                            disabled={entry.login === login}
                          />
                        )}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
            <Segment attached>
              <Form.Field>
                <Checkbox
                  checked={inherit}
                  onChange={onToggleInherit}
                  label={intl.formatMessage(messages.inherit)}
                />
              </Form.Field>
              <p className="help">
                <FormattedMessage
                  id="By default, permissions from the container of this item are inherited. If you disable this, only the explicitly defined sharing permissions will be valid. In the overview, the symbol {inherited} indicates an inherited value. Similarly, the symbol {global} indicates a global role, which is managed by the site administrator."
                  defaultMessage="By default, permissions from the container of this item are inherited. If you disable this, only the explicitly defined sharing permissions will be valid. In the overview, the symbol {inherited} indicates an inherited value. Similarly, the symbol {global} indicates a global role, which is managed by the site administrator."
                  values={{
                    inherited: (
                      <IconOld name="check circle outline" color="green" />
                    ),
                    global: (
                      <IconOld name="check circle outline" color="blue" />
                    ),
                  }}
                />
              </p>
            </Segment>
            <Segment className="actions" attached clearing>
              <Button
                basic
                primary
                floated="right"
                type="submit"
                aria-label={intl.formatMessage(messages.save)}
                title={intl.formatMessage(messages.save)}
                loading={updateRequest.loading}
                onClick={onSubmit}
              >
                <Icon className="circled" name={aheadSVG} size="30px" />
              </Button>
              <Button
                basic
                secondary
                aria-label={intl.formatMessage(messages.cancel)}
                title={intl.formatMessage(messages.cancel)}
                floated="right"
                onClick={onCancel}
              >
                <Icon className="circled" name={clearSVG} size="30px" />
              </Button>
            </Segment>
          </Form>
        </Plug>
      </Segment.Group>
      {isClient && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to={`${getBaseUrl(pathname)}`} className="item">
                <Icon
                  name={backSVG}
                  className="contents circled"
                  size="30px"
                  title={intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />
        </Portal>
      )}
    </Container>
  );
};

export default SharingComponent;
