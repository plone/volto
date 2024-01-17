/**
 * LinksToItem component
 * @module components/manage/LinksToItem/LinksToItem
 */
import { useEffect } from 'react';
import { find } from 'lodash';
import { Helmet } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Container, Segment, Table } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { getContent, queryRelations } from '@plone/volto/actions';
import {
  Icon as IconNext,
  Toolbar,
  UniversalLink,
} from '@plone/volto/components';

import { getBaseUrl } from '@plone/volto/helpers';
import backSVG from '@plone/volto/icons/back.svg';
import settingsSVG from '@plone/volto/icons/settings.svg';

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

  const title = useSelector((state) => state.content.data?.title || '');
  const myrelations = useSelector(
    (state) => state.relations.subrequests[itempath]?.data,
  );
  const actions = useSelector((state) => state.actions?.actions ?? {});
  const ploneSetupAction = find(actions.user, {
    id: 'plone_setup',
  });

  useEffect(() => {
    dispatch(queryRelations(null, false, itempath, null, [itempath]));
  }, [dispatch, itempath]);

  useEffect(() => {
    if (!title) dispatch(getContent(itempath));
  }, [dispatch, itempath, title]);

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

                <>
                  {ploneSetupAction ? (
                    <Link to="/controlpanel/relations" className="relations">
                      <IconNext
                        name={settingsSVG}
                        className="circled"
                        aria-label={intl.formatMessage(
                          messages.helpLinkRelationsControlPanel,
                        )}
                        size="30px"
                        title={intl.formatMessage(
                          messages.helpLinkRelationsControlPanel,
                        )}
                      />
                    </Link>
                  ) : null}
                </>
              </>
            }
          />
        </Portal>
      )}
    </Container>
  );
};

export default LinksToItem;
