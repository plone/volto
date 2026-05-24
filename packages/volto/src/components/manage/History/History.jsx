import { useEffect, useMemo, useCallback } from 'react';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import {
  Container as SemanticContainer,
  Dropdown,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';
import concat from 'lodash/concat';
import map from 'lodash/map';
import reverse from 'lodash/reverse';
import find from 'lodash/find';
import { createPortal } from 'react-dom';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { asyncConnect } from '@plone/volto/helpers/AsyncConnect';

import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import IconNext from '@plone/volto/components/theme/Icon/Icon';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Forbidden from '@plone/volto/components/theme/Forbidden/Forbidden';
import Unauthorized from '@plone/volto/components/theme/Unauthorized/Unauthorized';
import {
  getHistory,
  revertHistory,
} from '@plone/volto/actions/history/history';
import { listActions } from '@plone/volto/actions/actions/actions';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { useClient } from '@plone/volto/hooks/client/useClient';
import config from '@plone/volto/registry';

import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  history: {
    id: 'History',
    defaultMessage: 'History',
  },
});

const History = (props) => {
  const { staticContext } = props;
  const isClient = useClient();
  const dispatch = useDispatch();
  const location = useLocation();
  const pathname = location.pathname;
  const intl = useIntl();

  const objectActions = useSelector((state) => state.actions.actions.object);
  const token = useSelector((state) => state.userSession.token);
  const entries = useSelector((state) => state.history.entries);
  const title = useSelector((state) => state.content.data?.title);

  const onRevert = useCallback(
    (event, { value }) => {
      const baseUrl = getBaseUrl(pathname);
      dispatch(revertHistory(baseUrl, value)).then(() => {
        dispatch(getHistory(baseUrl));
      });
    },
    [dispatch, pathname],
  );

  useEffect(() => {
    dispatch(getHistory(getBaseUrl(pathname)));
  }, [dispatch, pathname]);

  const processedEntries = useMemo(() => {
    const result = reverse(concat(entries));
    let title = result.length > 0 ? result[0].state_title : '';
    for (let x = 1; x < result.length; x += 1) {
      result[x].prev_state_title = title;
      title = result[x].state_title || title;
    }
    reverse(result);

    const current_version = find(result, (item) => item.type === 'versioning');
    if (current_version) {
      current_version.is_current = true;
    }
    return result;
  }, [entries]);

  const historyAction = find(objectActions, {
    id: 'history',
  });

  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  return !historyAction ? (
    <>
      {token ? (
        <Forbidden pathname={pathname} staticContext={staticContext} />
      ) : (
        <Unauthorized pathname={pathname} staticContext={staticContext} />
      )}
    </>
  ) : (
    <Container id="page-history">
      <Helmet title={intl.formatMessage(messages.history)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="History of {title}"
            defaultMessage="History of {title}"
            values={{
              title: <q>{title}</q>,
            }}
          />
        </Segment>
        <Segment secondary>
          <FormattedMessage
            id="You can view the history of your item below."
            defaultMessage="You can view the history of your item below."
          />
        </Segment>
        <Table selectable compact singleLine attached>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>
                <FormattedMessage
                  id="History Version Number"
                  defaultMessage="#"
                />
              </Table.HeaderCell>
              <Table.HeaderCell width={4}>
                <FormattedMessage id="What" defaultMessage="What" />
              </Table.HeaderCell>
              <Table.HeaderCell width={4}>
                <FormattedMessage id="Who" defaultMessage="Who" />
              </Table.HeaderCell>
              <Table.HeaderCell width={4}>
                <FormattedMessage id="When" defaultMessage="When" />
              </Table.HeaderCell>
              <Table.HeaderCell width={4}>
                <FormattedMessage
                  id="Change Note"
                  defaultMessage="Change Note"
                />
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(processedEntries, (entry) => (
              <Table.Row key={entry.version ?? entry.time}>
                <Table.Cell>
                  {('version' in entry && entry.version > 0 && (
                    <Link
                      className="item"
                      to={`${getBaseUrl(pathname)}/diff?one=${
                        entry.version - 1
                      }&two=${entry.version}`}
                    >
                      {entry.version}
                    </Link>
                  )) || <span>{entry.version}</span>}
                </Table.Cell>
                <Table.Cell>
                  {('version' in entry && entry.version > 0 && (
                    <Link
                      className="item"
                      to={`${getBaseUrl(pathname)}/diff?one=${
                        entry.version - 1
                      }&two=${entry.version}`}
                    >
                      {entry.transition_title}
                    </Link>
                  )) || (
                    <span>
                      {entry.transition_title}
                      {entry.type === 'workflow' &&
                        ` (${
                          entry.action ? `${entry.prev_state_title} → ` : ''
                        }${entry.state_title})`}
                    </span>
                  )}
                </Table.Cell>
                <Table.Cell>{entry.actor.fullname}</Table.Cell>
                <Table.Cell>
                  <FormattedDate date={entry.time} />
                </Table.Cell>
                <Table.Cell>{entry.comments}</Table.Cell>
                <Table.Cell>
                  {entry.type === 'versioning' && (
                    <Dropdown icon="ellipsis horizontal">
                      <Dropdown.Menu className="left">
                        {'version' in entry && entry.version > 0 && (
                          <Link
                            className="item"
                            to={`${getBaseUrl(
                              pathname,
                            )}/diff?one=${entry.version - 1}&two=${
                              entry.version
                            }`}
                          >
                            <Icon name="copy" />{' '}
                            <FormattedMessage
                              id="View changes"
                              defaultMessage="View changes"
                            />
                          </Link>
                        )}
                        {'version' in entry && (
                          <Link
                            className="item"
                            to={`${getBaseUrl(pathname)}?version=${
                              entry.version
                            }`}
                          >
                            <Icon name="eye" />{' '}
                            <FormattedMessage
                              id="View this revision"
                              defaultMessage="View this revision"
                            />
                          </Link>
                        )}
                        {'version' in entry &&
                          entry.may_revert &&
                          !entry.is_current && (
                            <Dropdown.Item
                              value={entry.version}
                              onClick={onRevert}
                            >
                              <Icon name="undo" />{' '}
                              <FormattedMessage
                                id="Revert to this revision"
                                defaultMessage="Revert to this revision"
                              />
                            </Dropdown.Item>
                          )}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment.Group>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to={`${getBaseUrl(pathname)}`} className="item">
                <IconNext
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
    </Container>
  );
};

export default compose(
  asyncConnect([
    {
      key: 'actions',
      promise: async ({ location, store: { dispatch } }) =>
        await dispatch(listActions(getBaseUrl(location.pathname))),
    },
  ]),
)(History);
