/**
 * Relations Control Panel
 */
import React, { useEffect } from 'react';
import { find } from 'lodash';
import { useSelector } from 'react-redux';
import { Portal } from 'react-portal';
import { useHistory } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { Divider, Message, Segment } from 'semantic-ui-react';
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
