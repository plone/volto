/**
 * User Control Panel [user group membership management]
 * TODO Enrich with features of user control panel. Then replace user control panel.
 */
import React, { useEffect } from 'react';
import { find } from 'lodash';
import { Portal } from 'react-portal';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import { Helmet, messages } from '@plone/volto/helpers';
import {
  getControlpanel,
  getSystemInformation,
  listActions,
} from '@plone/volto/actions';
import { Icon, Toolbar, Unauthorized } from '@plone/volto/components';
import { getParentUrl } from '@plone/volto/helpers';
import UserGroupMembershipMatrix from '@plone/volto/components/manage/Controlpanels/Users/UserGroupMembershipMatrix';
import backSVG from '@plone/volto/icons/back.svg';
import settingsSVG from '@plone/volto/icons/settings.svg';

const UserGroupMembershipPanel = () => {
  const intl = useIntl();
  const history = useHistory();
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();

  const many_users = useSelector(
    (state) => state.controlpanels.controlpanel?.data?.many_users,
  );
  const many_groups = useSelector(
    (state) => state.controlpanels.controlpanel?.data?.many_groups,
  );
  const systeminformation = useSelector(
    (state) => state.controlpanels.systeminformation,
  );
  const can_use_group_membership_panel = systeminformation
    ? parseFloat(systeminformation?.plone_restapi_version.slice(0, 4)) >= 8.24
    : false;
  const actions = useSelector((state) => state.actions?.actions ?? {});
  const ploneSetupAction = find(actions.user, {
    id: 'plone_setup',
  });

  useEffect(() => {
    dispatch(listActions('/'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getControlpanel('usergroup'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSystemInformation());
  }, [dispatch]);

  if (__CLIENT__ && !ploneSetupAction) {
    return <Unauthorized />;
  }

  return (
    <>
      <Container className="users-control-panel">
        <Helmet title={intl.formatMessage(messages.usergroupmemberbership)} />
        <Segment.Group raised>
          <Segment className="primary">
            {intl.formatMessage(messages.usergroupmemberbership)}
          </Segment>
          {can_use_group_membership_panel &&
          many_users !== undefined &&
          many_groups !== undefined ? (
            many_users || many_groups ? (
              <>
                <Segment secondary>
                  <FormattedMessage
                    id="InfoUserGroupSettings"
                    defaultMessage="You have selected the option 'many users' or 'many groups'. Thus this control panel asks for input to show users and groups. If you want to see users and groups instantaneous, head over to user group settings. See the button on the left."
                  />
                </Segment>
                <Segment className="usergroupmembership">
                  <UserGroupMembershipMatrix
                    many_users={many_users}
                    many_groups={many_groups}
                  />
                </Segment>
              </>
            ) : (
              <Segment className="usergroupmembership">
                <UserGroupMembershipMatrix
                  many_users={many_users}
                  many_groups={many_groups}
                />
              </Segment>
            )
          ) : (
            <Segment secondary className="usergroupmembership upgrade-info">
              <div>
                <FormattedMessage
                  id="Please upgrade to plone.restapi >= 8.24.0."
                  defaultMessage="Please upgrade to plone.restapi >= 8.24.0."
                />
              </div>
            </Segment>
          )}
        </Segment.Group>
      </Container>

      {__CLIENT__ && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Link
                  className="item"
                  to="#"
                  onClick={() => {
                    history.push(getParentUrl(pathname));
                  }}
                >
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                  />
                </Link>
                <Link to="/controlpanel/usergroup" className="usergroup">
                  <Icon
                    name={settingsSVG}
                    className="circled"
                    aria-label={intl.formatMessage(messages.usergroup)}
                    size="30px"
                    title={intl.formatMessage(messages.usergroup)}
                  />
                </Link>
              </>
            }
          />
        </Portal>
      )}
    </>
  );
};

export default UserGroupMembershipPanel;
