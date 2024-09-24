import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Container, Divider, Message, Segment, Table } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

import { getDatabaseInformation } from '@plone/volto/actions';
import { Helmet } from '@plone/volto/helpers';
import { useClient } from '@plone/volto/hooks';
import { Icon, Toolbar } from '@plone/volto/components';
import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  databaseInformation: {
    id: 'Database Information',
    defaultMessage: 'Database Information',
  },
});

const DatabaseInformation = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isClient = useClient();
  const databaseInformation = useSelector(
    (state) => state.controlpanels.databaseinformation,
  );

  useEffect(() => {
    dispatch(getDatabaseInformation());
  }, [dispatch]);

  return databaseInformation ? (
    <Container id="database-page" className="controlpanel-database">
      <Helmet title={intl.formatMessage(messages.databaseInformation)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="Database Information"
            defaultMessage="Database Information"
          />
        </Segment>
        <Segment>
          <Message>
            <Message.Header>
              <FormattedMessage
                id="Database main"
                defaultMessage="Database main"
              />
            </Message.Header>
          </Message>
          <Table celled padded columns="2">
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <FormattedMessage
                    id="Database Location"
                    defaultMessage="Database Location"
                  />
                </Table.Cell>
                <Table.Cell>{databaseInformation.db_name}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <FormattedMessage
                    id="Database Size"
                    defaultMessage="Database Size"
                  />
                </Table.Cell>
                <Table.Cell>{databaseInformation.database_size}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <FormattedMessage
                    id="Total number of objects in the database"
                    defaultMessage="Total number of objects in the database"
                  />
                </Table.Cell>
                <Table.Cell>{databaseInformation.db_size}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <FormattedMessage
                    id="Total number of objects in memory from all caches"
                    defaultMessage="Total number of objects in memory from all caches"
                  />
                </Table.Cell>
                <Table.Cell>{databaseInformation.cache_size}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <FormattedMessage
                    id="Target number of objects in memory per cache"
                    defaultMessage="Target number of objects in memory per cache"
                  />
                </Table.Cell>
                <Table.Cell>{databaseInformation.cache_length}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <FormattedMessage
                    id="Target memory size per cache in bytes"
                    defaultMessage="Target memory size per cache in bytes"
                  />
                </Table.Cell>
                <Table.Cell>
                  {databaseInformation.cache_length_bytes}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Segment>
        <Segment>
          <Divider />

          <Message>
            <Message.Header>
              <FormattedMessage
                id="Total number of objects in each cache"
                defaultMessage="Total number of objects in each cache"
              />
            </Message.Header>
          </Message>
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <FormattedMessage
                    id="Cache Name"
                    defaultMessage="Cache Name"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <FormattedMessage
                    id="Number of active objects"
                    defaultMessage="Number of active objects"
                  />
                </Table.HeaderCell>
                <Table.HeaderCell>
                  <FormattedMessage
                    id="Total active and non-active objects"
                    defaultMessage="Total active and non-active objects"
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {databaseInformation.cache_detail_length.map((item) => (
              <Table.Row>
                <Table.Cell>{item.connection}</Table.Cell>
                <Table.Cell>{item.ngsize}</Table.Cell>
                <Table.Cell>{item.size}</Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </Segment>
      </Segment.Group>
      {isClient &&
        createPortal(
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Link to="/controlpanel" className="item">
                  <Icon
                    name={backSVG}
                    aria-label={intl.formatMessage(messages.back)}
                    className="contents circled"
                    size="30px"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              </>
            }
          />,
          document.getElementById('toolbar'),
        )}
    </Container>
  ) : null;
};

export default DatabaseInformation;
