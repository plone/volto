import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { map, find } from 'lodash';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { linkIntegrityCheck } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';

import { Confirm, Dimmer, Loader, Table } from 'semantic-ui-react';

const messages = defineMessages({
  deleteConfirmSingleItem: {
    id: 'Delete this item?',
    defaultMessage: 'Delete this item?',
  },
  deleteConfirmMultipleItems: {
    id: 'Delete selected items?',
    defaultMessage: 'Delete selected items?',
  },
  navigate_to_this_item: {
    id: 'Navigate to this items',
    defaultMessage: 'Navigate to this item',
  },
  loading: {
    id: 'link-integrity: loading references',
    defaultMessage: 'Checking references...',
  },
  delete: {
    id: 'link-integrity: Delete',
    defaultMessage: 'Delete',
  },
  delete_and_broken_links: {
    id: 'link-integrity: Delete item and break links',
    defaultMessage: 'Delete item and break links',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

const ContentsDeleteModal = (props) => {
  const { itemsToDelete = [], open, onCancel, onOk, items } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const linkintegrityInfo = useSelector((state) => state.linkIntegrity.result);
  const loading = useSelector((state) => state.linkIntegrity.loading);

  const [brokenReferences, setBrokenReferences] = useState(0);
  const [containedItemsToDelete, setContainedItemsToDelete] = useState([]);
  const [breaches, setBreaches] = useState([]);

  const [linksAndReferencesViewLink, setLinkAndReferencesViewLink] =
    useState(null);

  useEffect(() => {
    const getFieldById = (id, field) => {
      const item = find(items, { '@id': id });
      return item ? item[field] : '';
    };

    if (itemsToDelete.length > 0 && open) {
      dispatch(
        linkIntegrityCheck(
          map(itemsToDelete, (item) => getFieldById(item, 'UID')),
        ),
      );
    }
  }, [itemsToDelete, items, open, dispatch]);

  useEffect(() => {
    if (linkintegrityInfo) {
      const containedItems = linkintegrityInfo
        .map((result) => result.items_total ?? 0)
        .reduce((acc, value) => acc + value, 0);
      const breaches = linkintegrityInfo.flatMap((result) =>
        result.breaches.map((source) => ({
          source: source,
          target: result,
        })),
      );
      const source_by_uid = breaches.reduce(
        (acc, value) => acc.set(value.source.uid, value.source),
        new Map(),
      );
      const by_source = breaches.reduce((acc, value) => {
        if (acc.get(value.source.uid) === undefined) {
          acc.set(value.source.uid, new Set());
        }
        acc.get(value.source.uid).add(value.target);
        return acc;
      }, new Map());

      setContainedItemsToDelete(containedItems);
      setBrokenReferences(by_source.size);
      setLinkAndReferencesViewLink(
        linkintegrityInfo.length
          ? linkintegrityInfo[0]['@id'] + '/links-to-item'
          : null,
      );
      setBreaches(
        Array.from(by_source, (entry) => ({
          source: source_by_uid.get(entry[0]),
          targets: Array.from(entry[1]),
        })),
      );
    } else {
      setContainedItemsToDelete([]);
      setBrokenReferences(0);
      setLinkAndReferencesViewLink(null);
      setBreaches([]);
    }
  }, [linkintegrityInfo]);

  return (
    open && (
      <Confirm
        open={open}
        confirmButton={
          brokenReferences === 0
            ? intl.formatMessage(messages.delete)
            : intl.formatMessage(messages.delete_and_broken_links)
        }
        cancelButton={intl.formatMessage(messages.cancel)}
        header={
          itemsToDelete.length === 1
            ? intl.formatMessage(messages.deleteConfirmSingleItem)
            : intl.formatMessage(messages.deleteConfirmMultipleItems)
        }
        content={
          <div className="content">
            <Dimmer active={loading} inverted>
              <Loader indeterminate size="massive">
                {intl.formatMessage(messages.loading)}
              </Loader>
            </Dimmer>

            {itemsToDelete.length > 1 ? (
              containedItemsToDelete > 0 ? (
                <>
                  <FormattedMessage
                    id="Some items are also a folder. By deleting them you will delete {containedItemsToDelete} {variation} inside the folders."
                    defaultMessage="Some items are also a folder. By deleting them you will delete {containedItemsToDelete} {variation} inside the folders."
                    values={{
                      containedItemsToDelete: (
                        <span>{containedItemsToDelete}</span>
                      ),
                      variation: (
                        <span>
                          {containedItemsToDelete === 1 ? (
                            <FormattedMessage id="item" defaultMessage="item" />
                          ) : (
                            <FormattedMessage
                              id="items"
                              defaultMessage="items"
                            />
                          )}
                        </span>
                      ),
                    }}
                  />
                  {brokenReferences > 0 && (
                    <>
                      <br />
                      <FormattedMessage
                        id="Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken."
                        defaultMessage="Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken."
                        values={{
                          brokenReferences: <span>{brokenReferences}</span>,
                          variation: (
                            <span>
                              {brokenReferences === 1 ? (
                                <FormattedMessage
                                  id="reference"
                                  defaultMessage="reference"
                                />
                              ) : (
                                <FormattedMessage
                                  id="references"
                                  defaultMessage="references"
                                />
                              )}
                            </span>
                          ),
                        }}
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  {brokenReferences > 0 && (
                    <>
                      <FormattedMessage
                        id="Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken."
                        defaultMessage="Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken."
                        values={{
                          brokenReferences: <span>{brokenReferences}</span>,
                          variation: (
                            <span>
                              {brokenReferences === 1 ? (
                                <FormattedMessage
                                  id="reference"
                                  defaultMessage="reference"
                                />
                              ) : (
                                <FormattedMessage
                                  id="references"
                                  defaultMessage="references"
                                />
                              )}
                            </span>
                          ),
                        }}
                      />
                    </>
                  )}
                </>
              )
            ) : containedItemsToDelete > 0 ? (
              <>
                <FormattedMessage
                  id="This item is also a folder. By deleting it you will delete {containedItemsToDelete} {variation} inside the folder."
                  defaultMessage="This item is also a folder. By deleting it you will delete {containedItemsToDelete} {variation} inside the folder."
                  values={{
                    containedItemsToDelete: (
                      <span>{containedItemsToDelete}</span>
                    ),
                    variation: (
                      <span>
                        {containedItemsToDelete === 1 ? (
                          <FormattedMessage id="item" defaultMessage="item" />
                        ) : (
                          <FormattedMessage id="items" defaultMessage="items" />
                        )}
                      </span>
                    ),
                  }}
                />
                {brokenReferences > 0 && (
                  <>
                    <br />
                    <FormattedMessage
                      id="Deleting this item breaks {brokenReferences} {variation}."
                      defaultMessage="Deleting this item breaks {brokenReferences} {variation}."
                      values={{
                        brokenReferences: <span>{brokenReferences}</span>,
                        variation: (
                          <span>
                            {brokenReferences === 1 ? (
                              <FormattedMessage
                                id="reference"
                                defaultMessage="reference"
                              />
                            ) : (
                              <FormattedMessage
                                id="references"
                                defaultMessage="references"
                              />
                            )}
                          </span>
                        ),
                      }}
                    />
                    <BrokenLinksList
                      intl={intl}
                      breaches={breaches}
                      linksAndReferencesViewLink={linksAndReferencesViewLink}
                    />
                  </>
                )}
              </>
            ) : brokenReferences > 0 ? (
              <>
                <FormattedMessage
                  id="Deleting this item breaks {brokenReferences} {variation}."
                  defaultMessage="Deleting this item breaks {brokenReferences} {variation}."
                  values={{
                    brokenReferences: <span>{brokenReferences}</span>,
                    variation: (
                      <span>
                        {brokenReferences === 1 ? (
                          <FormattedMessage
                            id="reference"
                            defaultMessage="reference"
                          />
                        ) : (
                          <FormattedMessage
                            id="references"
                            defaultMessage="references"
                          />
                        )}
                      </span>
                    ),
                  }}
                />
                <BrokenLinksList
                  intl={intl}
                  breaches={breaches}
                  linksAndReferencesViewLink={linksAndReferencesViewLink}
                />
              </>
            ) : null}
          </div>
        }
        onCancel={onCancel}
        onConfirm={onOk}
        size="medium"
      />
    )
  );
};

const BrokenLinksList = ({ intl, breaches, linksAndReferencesViewLink }) => {
  return (
    <div className="broken-links-list">
      <FormattedMessage
        id="These items will have broken links"
        defaultMessage="These items will have broken links"
      />
      :
      <Table compact>
        <Table.Body>
          {breaches.map((breach) => (
            <Table.Row key={breach.source['@id']} verticalAlign="top">
              <Table.Cell>
                <Link
                  to={flattenToAppURL(breach.source['@id'])}
                  title={intl.formatMessage(messages.navigate_to_this_item)}
                >
                  {breach.source.title}
                </Link>
              </Table.Cell>
              <Table.Cell style={{ minWidth: '140px' }}>
                <FormattedMessage id="refers to" defaultMessage="refers to" />:
              </Table.Cell>
              <Table.Cell>
                <ul style={{ margin: 0 }}>
                  {breach.targets.map((target) => (
                    <li key={target['@id']}>
                      <Link
                        to={flattenToAppURL(target['@id'])}
                        title={intl.formatMessage(
                          messages.navigate_to_this_item,
                        )}
                      >
                        {target.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      {linksAndReferencesViewLink && (
        <Link to={flattenToAppURL(linksAndReferencesViewLink)}>
          <FormattedMessage
            id="View links and references to this item"
            defaultMessage="View links and references to this item"
          />
        </Link>
      )}
    </div>
  );
};
ContentsDeleteModal.propTypes = {
  itemsToDelete: PropTypes.arrayOf(
    PropTypes.shape({
      UID: PropTypes.string,
    }),
  ).isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
export default ContentsDeleteModal;
