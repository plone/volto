import React, { useCallback, useEffect } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import {
  Container as SemanticContainer,
  Dropdown,
  Icon,
  Segment,
  Table,
} from 'semantic-ui-react';
import { concat, map, reverse, find } from 'lodash';
import { Portal } from 'react-portal';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { asyncConnect, usePrevious } from '@plone/volto/helpers';

import {
  FormattedDate,
  Icon as IconNext,
  Toolbar,
  Forbidden,
  Unauthorized,
} from '@plone/volto/components';
import { getHistory, revertHistory, listActions } from '@plone/volto/actions';
import { getBaseUrl } from '@plone/volto/helpers';
import { useClient } from '@plone/volto/hooks';
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
  const intl = useIntl();
  const dispatch = useDispatch();
  const isClient = useClient();
  const { pathname } = props.location;
  const objectActions = useSelector((state) => state.actions.actions.object);
  const token = useSelector((state) => state.userSession.token);
  const state_entries = useSelector((state) => state.history.entries);
  const title = useSelector((state) => state.content.data?.title);
  const revertRequest = useSelector((state) => state.history.revert);
  const prevrevertRequestloading = usePrevious(revertRequest.loading);

  useEffect(() => {
    dispatch(getHistory(getBaseUrl(pathname)));
  }, [dispatch, pathname]);

  useEffect(() => {
    if (prevrevertRequestloading && revertRequest.loaded) {
      dispatch(getHistory(getBaseUrl(pathname)));
    }
  }, [dispatch, prevrevertRequestloading, revertRequest.loaded, pathname]);

  const onRevert = (event, { value }) => {
    dispatch(revertHistory(getBaseUrl(pathname), value));
  };

  const processHistoryEntries = useCallback(() => {
    // Getting the history entries from the props
    // No clue why the reverse(concat()) is necessary
    const entries = reverse(concat(state_entries));
    let title = entries.length > 0 ? entries[0].state_title : '';
    for (let x = 1; x < entries.length; x += 1) {
      entries[x].prev_state_title = title;
      title = entries[x].state_title || title;
    }
    // We reverse them again
    reverse(entries);

    // We identify the latest 'versioning' entry and mark it
    const current_version = find(entries, (item) => item.type === 'versioning');
    if (current_version) {
      current_version.is_current = true;
    }
    return entries;
  }, [state_entries]);

  const historyAction = find(objectActions, {
    id: 'history',
  });
  const entries = processHistoryEntries();

  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  return !historyAction ? (
    <>
      {token ? (
        <Forbidden pathname={pathname} staticContext={props.staticContext} />
      ) : (
        <Unauthorized pathname={pathname} staticContext={props.staticContext} />
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
            {map(entries, (entry) => (
              <Table.Row key={entry.time}>
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
                            to={`${getBaseUrl(pathname)}/diff?one=${
                              entry.version - 1
                            }&two=${entry.version}`}
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
      {isClient && (
        <Portal node={document.getElementById('toolbar')}>
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
          />
        </Portal>
      )}
    </Container>
  );
};

export default compose(
  asyncConnect([
    {
      key: 'actions',
      // Dispatch async/await to make the operation syncronous, otherwise it returns
      // before the promise is resolved
      promise: async ({ location, store: { dispatch } }) =>
        await dispatch(listActions(getBaseUrl(location.pathname))),
    },
  ]),
)(History);
