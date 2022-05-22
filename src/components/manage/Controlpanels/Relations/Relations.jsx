/**
 * Relations Control Panel
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
import RelationsMatrix from '@plone/volto/components/manage/Controlpanels/Relations/RelationsMatrix';
import backSVG from '@plone/volto/icons/back.svg';

const RelationsControlPanel = () => {
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
            <FormattedMessage id="Relations" defaultMessage="Relations" />
          </Segment>
          <Segment>
            <RelationsMatrix />
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

export default RelationsControlPanel;
