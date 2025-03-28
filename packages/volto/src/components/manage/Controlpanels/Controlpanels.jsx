/**
 * Controlpanels component.
 * @module components/manage/Controlpanels/Controlpanels
 */

import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import concat from 'lodash/concat';
import filter from 'lodash/filter';
import last from 'lodash/last';
import map from 'lodash/map';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import { useEffect, useState } from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Grid, Header, Message, Segment } from 'semantic-ui-react';

import Error from '@plone/volto/components/theme/Error/Error';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import VersionOverview from '@plone/volto/components/manage/Controlpanels/VersionOverview';

import config from '@plone/volto/registry';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  sitesetup: {
    id: 'Site Setup',
    defaultMessage: 'Site Setup',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  versionoverview: {
    id: 'Version Overview',
    defaultMessage: 'Version Overview',
  },
  general: {
    id: 'General',
    defaultMessage: 'General',
  },
  addonconfiguration: {
    id: 'Add-on Configuration',
    defaultMessage: 'Add-on Configuration',
  },
  content: {
    id: 'Content',
    defaultMessage: 'Content',
  },
  moderatecomments: {
    id: 'Moderate Comments',
    defaultMessage: 'Moderate Comments',
  },
  usersandgroups: {
    id: 'Users and Groups',
    defaultMessage: 'Users and Groups',
  },
  usersControlPanelCategory: {
    id: 'Users',
    defaultMessage: 'Users',
  },
  users: {
    id: 'Users',
    defaultMessage: 'Users',
  },
  groups: {
    id: 'Groups',
    defaultMessage: 'Groups',
  },
  addons: {
    id: 'Add-Ons',
    defaultMessage: 'Add-Ons',
  },
  database: {
    id: 'Database',
    defaultMessage: 'Database',
  },
  usergroupmemberbership: {
    id: 'User Group Membership',
    defaultMessage: 'User Group Membership',
  },
  undo: {
    id: 'Undo',
    defaultMessage: 'Undo',
  },
  urlmanagement: {
    id: 'URL Management',
    defaultMessage: 'URL Management',
  },
  contentRules: {
    id: 'Content Rules',
    defaultMessage: 'Content Rules',
  },
  relations: {
    id: 'Relations',
    defaultMessage: 'Relations',
  },
});

/**
 * Controlpanels container class.
 */
export default function Controlpanels({ location }) {
  const intl = useIntl();
  const [isClient, setIsClient] = useState(false);

  const { pathname } = location;
  const controlpanels = useSelector(
    (state) => state.controlpanels.controlpanels,
  );
  const controlpanelsRequest = useSelector((state) => state.controlpanels.list);
  const systemInformation = useSelector(
    (state) => state.controlpanels.systeminformation,
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  const error = controlpanelsRequest?.error;

  if (error) {
    return <Error error={error} />;
  }

  let customcontrolpanels = config.settings.controlpanels
    ? config.settings.controlpanels.map((el) => {
        el.group =
          intl.formatMessage({
            id: el.group,
            defaultMessage: el.group,
          }) || el.group;
        return el;
      })
    : [];
  const { filterControlPanels } = config.settings;

  const filteredControlPanels = map(
    concat(filterControlPanels(controlpanels), customcontrolpanels, [
      {
        '@id': '/addons',
        group: intl.formatMessage(messages.general),
        title: intl.formatMessage(messages.addons),
      },
      {
        '@id': '/database',
        group: intl.formatMessage(messages.general),
        title: intl.formatMessage(messages.database),
      },
      {
        '@id': '/rules',
        group: intl.formatMessage(messages.content),
        title: intl.formatMessage(messages.contentRules),
      },
      {
        '@id': '/undo',
        group: intl.formatMessage(messages.general),
        title: intl.formatMessage(messages.undo),
      },
      {
        '@id': '/aliases',
        group: intl.formatMessage(messages.general),
        title: intl.formatMessage(messages.urlmanagement),
      },
      {
        '@id': '/relations',
        group: intl.formatMessage(messages.content),
        title: intl.formatMessage(messages.relations),
      },
      {
        '@id': '/moderate-comments',
        group: intl.formatMessage(messages.content),
        title: intl.formatMessage(messages.moderatecomments),
      },
      {
        '@id': '/users',
        group: intl.formatMessage(messages.usersControlPanelCategory),
        title: intl.formatMessage(messages.users),
      },
      {
        '@id': '/usergroupmembership',
        group: intl.formatMessage(messages.usersControlPanelCategory),
        title: intl.formatMessage(messages.usergroupmemberbership),
      },
      {
        '@id': '/groups',
        group: intl.formatMessage(messages.usersControlPanelCategory),
        title: intl.formatMessage(messages.groups),
      },
    ]),
    (controlpanel) => ({
      ...controlpanel,
      id: last(controlpanel['@id'].split('/')),
    }),
  );
  const groups = map(uniqBy(filteredControlPanels, 'group'), 'group');
  const { controlPanelsIcons: icons } = config.settings;

  return (
    <div className="view-wrapper">
      <Helmet title={intl.formatMessage(messages.sitesetup)} />
      <Container className="controlpanel">
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage id="Site Setup" defaultMessage="Site Setup" />
          </Segment>
          {systemInformation && systemInformation.upgrade && (
            <Message attached warning>
              <FormattedMessage
                id="The site configuration is outdated and needs to be upgraded."
                defaultMessage="The site configuration is outdated and needs to be upgraded."
              />{' '}
              <Link to={`/controlpanel/plone-upgrade`}>
                <FormattedMessage
                  id="Please continue with the upgrade."
                  defaultMessage="Please continue with the upgrade."
                />
              </Link>
            </Message>
          )}
          {map(groups, (group) => [
            <Segment key={`header-${group}`} secondary>
              {group}
            </Segment>,
            <Segment key={`body-${group}`} attached>
              <Grid doubling columns={6}>
                <Grid.Row>
                  {map(
                    sortBy(
                      filter(filteredControlPanels, { group }),
                      (controlpanel) => controlpanel.title,
                    ),
                    (controlpanel) => (
                      <Grid.Column key={controlpanel.id}>
                        <Link to={`/controlpanel/${controlpanel.id}`}>
                          <Header as="h3" icon textAlign="center">
                            <Icon
                              name={icons?.[controlpanel.id] || icons.default}
                              size="48px"
                            />
                            <Header.Content>
                              {controlpanel.title}
                            </Header.Content>
                          </Header>
                        </Link>
                      </Grid.Column>
                    ),
                  )}
                </Grid.Row>
              </Grid>
            </Segment>,
          ])}
        </Segment.Group>
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Version Overview"
              defaultMessage="Version Overview"
            />
          </Segment>
          <Segment attached>
            {systemInformation ? (
              <VersionOverview {...systemInformation} />
            ) : null}
          </Segment>
        </Segment.Group>
      </Container>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to="/" className="item">
                <Icon
                  name={backSVG}
                  className="contents circled"
                  size="30px"
                  title={intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </div>
  );
}
