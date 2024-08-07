/**
 * LinksToItem component
 * @module components/manage/LinksToItem/LinksToItem
 */
import { useEffect } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { find } from 'lodash';
import { Portal } from 'react-portal';
import { Container, Segment, Table } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getContent, queryRelations, listActions } from '@plone/volto/actions';
import { asyncConnect } from '@plone/volto/helpers';

import {
  Icon as IconNext,
  Toolbar,
  UniversalLink,
  Unauthorized,
} from '@plone/volto/components';
import { compose } from 'redux';

import { getBaseUrl } from '@plone/volto/helpers';
import backSVG from '@plone/volto/icons/back.svg';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  linkstoitem: {
    id: 'Links and references',
    defaultMessage: 'Links and references',
  },
  helpLinkRelationsControlPanel: {
    id: 'Overview of relations of all content items',
    defaultMessage: 'Overview of relations of all content items',
  },
});

const LinksToItem = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const pathname = props.location.pathname;
  const itempath = getBaseUrl(pathname);
  const objectActions = useSelector((state) => state.actions.actions.object);
  const editPermission = find(objectActions, { id: 'edit' });

  const title = useSelector((state) => state.content.data?.title || '');
  const myrelations = useSelector(
    (state) => state.relations.subrequests[itempath]?.data,
  );

  useEffect(() => {
    dispatch(queryRelations(null, false, itempath, null, [itempath]));
  }, [dispatch, itempath]);

  useEffect(() => {
    dispatch(getContent(itempath));
  }, [dispatch, itempath]);

  let links = {};
  if (myrelations) {
    Object.keys(myrelations).forEach((relationtype) => {
      links[relationtype] = {};
      myrelations[relationtype].items.forEach((item) => {
        links[relationtype][item.source.UID] = item.source;
      });
    });
  }

  let links_ordered = {};
  Object.keys(links).forEach((relationtype) => {
    links_ordered[relationtype] = Object.values(links[relationtype]).sort(
      (link) => link['@id'],
    );
  });

  const relations_found = Object.keys(links_ordered).length > 0;
  if (!editPermission) {
    return <Unauthorized />;
  }
  return (
    <Container id="linkstoitem">
      <Helmet title={intl.formatMessage(messages.linkstoitem)} />
      <Segment.Group raised>
        <Segment className="primary">
          <FormattedMessage
            id="Content that links to or references {title}"
            defaultMessage="Content that links to or references {title}"
            values={{ title: <q>{title}</q> }}
          />
        </Segment>
        {relations_found ? (
          <Table selectable compact singleLine attached>
            {
              <Table.Body>
                {Object.keys(links_ordered).map((relationtype) => {
                  return [].concat(
                    [
                      <Table.Row>
                        <Table.HeaderCell>
                          {relationtype === 'isReferencing' ? (
                            <FormattedMessage
                              id="Linking this item with hyperlink in text"
                              defaultMessage="Linking this item with hyperlink in text"
                            />
                          ) : relationtype === 'relatedItems' ? (
                            <FormattedMessage
                              id="Referencing this item as related item"
                              defaultMessage="Referencing this item as related item"
                            />
                          ) : (
                            <>
                              <FormattedMessage
                                id="Referencing this item with {relationship}"
                                defaultMessage="Referencing this item with {relationship}"
                                values={{ relationship: <q>{relationtype}</q> }}
                              />
                            </>
                          )}
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
                      </Table.Row>,
                    ],
                    links_ordered[relationtype].map((link) => {
                      return (
                        <Table.Row key={link['@id']}>
                          <Table.Cell>
                            <UniversalLink
                              href={link['@id']}
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
                      );
                    }),
                  );
                })}
              </Table.Body>
            }
          </Table>
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
              <>
                <Link to={itempath} className="item">
                  <IconNext
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              </>
            }
          />
        </Portal>
      )}
    </Container>
  );
};

export const __test__ = LinksToItem;
export default compose(
  asyncConnect([
    {
      key: 'actions',
      // Dispatch async/await to make the operation synchronous, otherwise it returns
      // before the promise is resolved
      promise: async ({ location, store: { dispatch } }) =>
        await dispatch(listActions(getBaseUrl(location.pathname))),
    },
  ]),
)(LinksToItem);
