/**
 * User Control Panel [user group membership management]
 * TODO Enrich with features of user control panel. Then replace user control panel.
 */
import React, { useEffect } from 'react';
import { Portal } from 'react-portal';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Container, Segment } from 'semantic-ui-react';
import { Helmet, messages } from '@plone/volto/helpers';
import { listActions } from '@plone/volto/actions';
import { Icon, Toolbar } from '@plone/volto/components';
import { getParentUrl } from '@plone/volto/helpers';
import UserGroupMembershipMatrix from '@plone/volto/components/manage/Controlpanels/Users/UserGroupMembershipMatrix';
import backSVG from '@plone/volto/icons/back.svg';

const UserControlPanel = () => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listActions('/'));
  }, [dispatch]);

  return (
    <>
      <Container className="users-control-panel">
        <Helmet title={intl.formatMessage(messages.users)} />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage id="Users" defaultMessage="Users" />
          </Segment>
          <Segment>
            <UserGroupMembershipMatrix />
          </Segment>
        </Segment.Group>
      </Container>

      {__CLIENT__ && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={location.pathname}
            hideDefaultViewButtons
            inner={
              <Link
                className="item"
                to="#"
                onClick={() => {
                  history.push(getParentUrl(location.pathname));
                }}
              >
                <Icon name={backSVG} className="contents circled" size="30px" />
              </Link>
            }
          />
        </Portal>
      )}
    </>
  );
};

export default UserControlPanel;
