/**
 * LinksToItem component
 * @module components/manage/LinksToItem/LinksToItem
 */
import React, { useEffect } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Container, Segment, Table } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { map } from 'lodash';
import { getContent, queryRelations } from '@plone/volto/actions';
import {
  Icon as IconNext,
  Toolbar,
  UniversalLink,
} from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import { getBaseUrl } from '@plone/volto/helpers';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  linkstoitem: {
    id: 'Links To Item',
    defaultMessage: 'Links To Item',
  },
});

const LinksToItem = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const pathname = props.location.pathname;
  const itempath = getBaseUrl(pathname);

  const title = useSelector((state) => state.content.data?.title || '');
  const myrelations = useSelector(
    (state) => state.relations.subrequests[itempath]?.relations,
  );

  useEffect(() => {
    dispatch(queryRelations(null, false, itempath, null, [itempath]));
  }, [dispatch, itempath]);

  useEffect(() => {
    if (!title) dispatch(getContent(itempath));
  }, [dispatch, itempath, title]);

  let links = {};
  if (myrelations && 'isReferencing' in myrelations) {
    myrelations['isReferencing'].items.forEach((item) => {
      links[item.source.UID] = item.source;
    });
  }

  let links_ordered = Object.values(links).sort((link) => link['@id']);
  const relations_found = links_ordered.length > 0;
  return (
    <Container id="linkstoitem">
      <Helmet title={intl.formatMessage(messages.linkstoitem)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="Links to {title}"
            defaultMessage="Links to {title}"
            values={{ title: <q>{title}</q> }}
          />
        </Segment>
        {relations_found ? (
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
                    <FormattedMessage
                      id="Linking this item"
                      defaultMessage="Linking this item"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage
                      id="Review state"
                      defaultMessage="Review state"
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    <FormattedMessage id="Type" defaultMessage="Type" />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              {
                <Table.Body>
                  {map(links_ordered, (link) => (
                    <Table.Row key={link['@id']}>
                      <Table.Cell>
                        <UniversalLink
                          href={link['@id']}
                          target="_blank"
                          className={`source ${link.review_state}`}
                        >
                          <span className="label" title={link.type_title}>
                            {link.title}
                          </span>
                        </UniversalLink>
                      </Table.Cell>
                      <Table.Cell>
                        <span>{link.review_state}</span>
                      </Table.Cell>
                      <Table.Cell>
                        <span>{link.type_title || ''}</span>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              }
            </Table>
          </>
        ) : (
          <Segment secondary>
            <FormattedMessage
              id="No links to this item found."
              defaultMessage="No links to this item found."
            />
          </Segment>
        )}
      </Segment.Group>
      {__CLIENT__ && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <Link to={itempath} className="item">
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
