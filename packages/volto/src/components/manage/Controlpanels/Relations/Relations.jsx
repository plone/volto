/**
 * Relations Control Panel
 */
import React, { useEffect, useState } from 'react';
import find from 'lodash/find';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Divider, Message, Segment } from 'semantic-ui-react';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { messages } from '@plone/volto/helpers/MessageLabels/MessageLabels';
import { listActions } from '@plone/volto/actions/actions/actions';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import { getParentUrl } from '@plone/volto/helpers/Url/Url';
import RelationsMatrix from '@plone/volto/components/manage/Controlpanels/Relations/RelationsMatrix';
import backSVG from '@plone/volto/icons/back.svg';

const RelationsControlPanel = () => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const brokenRelations = useSelector(
    (state) => state.relations?.stats?.data?.broken,
  );

  const relations_stats = useSelector((state) => state.relations?.stats?.data);
  const actions = useSelector((state) => state.actions?.actions ?? {});
  const can_edit = find(actions.object, {
    id: 'edit',
  });

  useEffect(() => {
    dispatch(listActions('/'));
  }, [dispatch]);

  return (
    <>
      <div className="ui container">
        <div className="relations-control-panel">
          <Helmet title={intl.formatMessage(messages.relations)} />
          {can_edit ? (
            <Segment.Group raised>
              <Segment className="primary">
                {brokenRelations && Object.keys(brokenRelations).length > 0 ? (
                  <React.Fragment>
                    <Message warning>
                      <FormattedMessage
                        id="Some relations are broken. Please fix."
                        defaultMessage="Some relations are broken. Please fix."
                      />
                    </Message>
                    <Divider hidden />
                  </React.Fragment>
                ) : null}
                <h1>
                  <FormattedMessage id="Relations" defaultMessage="Relations" />
                </h1>
                {relations_stats?.error ? (
                  <React.Fragment>
                    <Divider hidden />
                    <Message warning>
                      <FormattedMessage
                        id="Please upgrade to plone.restapi >= 8.39.0."
                        defaultMessage="Please upgrade to plone.restapi >= 8.39.0."
                      />
                    </Message>
                  </React.Fragment>
                ) : null}
              </Segment>
              <Segment>
                <RelationsMatrix />
              </Segment>
            </Segment.Group>
          ) : (
            <Segment.Group>
              <Segment>
                <FormattedMessage id="Relations" defaultMessage="Relations" />
                <Divider hidden />
                <FormattedMessage
                  id="You have not the required permission for this control panel."
                  defaultMessage="You have not the required permission for this control panel."
                />
              </Segment>
            </Segment.Group>
          )}
        </div>
      </div>

      {isClient &&
        createPortal(
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
          />,
          document.getElementById('toolbar'),
        )}
    </>
  );
};

export default RelationsControlPanel;
