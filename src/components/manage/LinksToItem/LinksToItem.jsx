/**
 * LinksToItem component
 * @module components/manage/LinksToItem/LinksToItem
 */
import React, { useEffect } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import {
  Container,
  Segment,
  Table,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import { queryRelations } from '@plone/volto/actions';
import { Icon as IconNext, Toolbar, UniversalLink } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import { getBaseUrl } from '@plone/volto/helpers';
import { useLocation } from 'react-router-dom';


const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  linktoitem: {
    id: 'Link To Item',
    defaultMessage: 'Link To Item',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  successAdd: {
    id: 'Alias has been added',
    defaultMessage: 'Alias has been added',
  },
});

const LinksToItem = (props) => {

  const intl = useIntl();
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();

  // XXX: UID might be the one from another object.
  const uid = useSelector(
    (state) => {
      return state.content?.data?.UID || {};
    },
  );
  const title = useSelector(
    (state) => {
      return state.content?.data?.title || {};
    },
  );

  useEffect(() => {
    dispatch(queryRelations(null, false, null, null, [uid]));
  }, [dispatch]);
  const relations = useSelector(
    (state) => {
      return state.relations?.relations?.items || [];
    },
  );

  let links = {};

  // Create a list of links (via constructing a hashmap and thus avoiding duplicates)
  for (const relation_items of Object.values(relations)) {
    for (const item of relation_items) {
      links[item.source.UID] = item.source;
    }
  }

  let links_ordered = Object.values(links).sort((link) => link['@id']);
  const relations_found = links_ordered.length > 0;

  return (
    <Container id="linktoitem">
      <Helmet title={intl.formatMessage(messages.linktoitem)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="Links to {title}"
            defaultMessage="Links to {title}"
            values={{ title: <q>{title}</q> }}
          />
        </Segment>
        {relations_found && (
          <>
            <Segment secondary>
              <FormattedMessage
                id="Whenever this item is being referenced from some different item by a hyperlink, block or similar, it appears here in this list."
                defaultMessage="Whenever this item is being referenced from some different item by a hyperlink, block or similar, it appears here in this list."
              />
            </Segment>
            <Table selectable compact singleLine attached>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                    <FormattedMessage id="Linked by this item" defaultMessage="Linked by this item" />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Review state"
                      defaultMessage="Review state"
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {<Table.Body>
                {map(links_ordered, (link) => (
                  <Table.Row key={link["@id"]}>
                    <Table.Cell>
                      <UniversalLink
                        href={link["@id"]}
                        className={
                          link.review_state !== 'published'
                            ? 'not-published'
                            : ''
                        }
                      >
                        <span className="label" title={link.value}>
                          {link.title}
                        </span>
                      </UniversalLink>

                    </Table.Cell>
                    <Table.Cell>
                      <span>
                        {link.review_state}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>}
            </Table>
          </>
        )}
        {!relations_found &&
          <Segment secondary>
            <FormattedMessage
              id="No links to this item found."
              defaultMessage="No links to this item found."
            />
          </Segment>
        }
      </Segment.Group>
      {__CLIENT__ && (
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

export default LinksToItem;
