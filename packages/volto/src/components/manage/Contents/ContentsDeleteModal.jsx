import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import map from 'lodash/map';
import find from 'lodash/find';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
import { linkIntegrityCheck } from '@plone/volto/actions/content/content';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';

import { Confirm, Dimmer, Loader, Table } from 'semantic-ui-react';

const MAX_BREACHES_TO_SHOW = 5;

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
    id: 'Navigate to this item',
    defaultMessage: 'Navigate to this item',
  },
  loading: {
    id: 'link-integrity: loading references',
    defaultMessage: 'Checking references...',
  },
  delete: {
    id: 'Delete',
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
  item: {
    id: 'item',
    defaultMessage: 'item',
  },
  items: {
    id: 'items',
    defaultMessage: 'items',
  },
  reference: {
    id: 'reference',
    defaultMessage: 'reference',
  },
  references: {
    id: 'references',
    defaultMessage: 'references',
  },
  folderDeletionSingle: {
    id: 'This item is also a folder. By deleting it you will delete {containedItemsToDelete} {variation} inside the folder.',
    defaultMessage:
      'This item is also a folder. By deleting it you will delete {containedItemsToDelete} {variation} inside the folder.',
  },
  folderDeletionMultiple: {
    id: 'Some items are also a folder. By deleting them you will delete {containedItemsToDelete} {variation} inside the folders.',
    defaultMessage:
      'Some items are also a folder. By deleting them you will delete {containedItemsToDelete} {variation} inside the folders.',
  },
  deleteAllItemsPaginated: {
    id: 'You are about to delete all items in the current pagination of this folder.',
    defaultMessage:
      'You are about to delete all items in the current pagination of this folder.',
  },
  deleteAllItems: {
    id: 'You are about to delete all items in this folder.',
    defaultMessage: 'You are about to delete all items in this folder.',
  },
  brokenReferencesMultiple: {
    id: 'Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken.',
    defaultMessage:
      'Some items are referenced by other contents. By deleting them {brokenReferences} {variation} will be broken.',
  },
  brokenReferencesSingle: {
    id: 'Deleting this item breaks {brokenReferences} {variation}.',
    defaultMessage: 'Deleting this item breaks {brokenReferences} {variation}.',
  },
});

const safeUrl = (url) => {
  if (!url) return '#';
  return typeof url === 'string' ? flattenToAppURL(url) : '#';
};

const DeleteItemsList = ({ itemsToDelete, titlesToDelete }) => (
  <ul>
    {itemsToDelete.map((id) => (
      <li key={id}>
        <Link to={safeUrl(id)} target="_blank">
          {titlesToDelete[id] || id}
        </Link>
      </li>
    ))}
  </ul>
);

const VariationMessage = ({ count, singularId, pluralId }) => (
  <span>
    {count === 1 ? (
      <FormattedMessage {...messages[singularId]} />
    ) : (
      <FormattedMessage {...messages[pluralId]} />
    )}
  </span>
);

const DeleteAllMessage = ({ hasMultiplePages }) => (
  <p>
    <FormattedMessage
      {...messages[
        hasMultiplePages ? 'deleteAllItemsPaginated' : 'deleteAllItems'
      ]}
    />
  </p>
);

const DeleteMessage = ({
  isMultiple,
  containedItemsToDelete,
  brokenReferences,
  breaches,
  itemsToDelete,
  linksAndReferencesViewLink,
}) => {
  const intl = useIntl();
  const showFolderMessage = containedItemsToDelete > 0;
  const showBreachesMessage = brokenReferences > 0;

  return (
    <>
      {showFolderMessage && (
        <p>
          <FormattedMessage
            {...messages[
              isMultiple ? 'folderDeletionMultiple' : 'folderDeletionSingle'
            ]}
            values={{
              containedItemsToDelete: <span>{containedItemsToDelete}</span>,
              variation: (
                <VariationMessage
                  count={containedItemsToDelete}
                  singularId="item"
                  pluralId="items"
                />
              ),
            }}
          />
        </p>
      )}
      {showBreachesMessage && (
        <BrokenLinksList
          intl={intl}
          breaches={breaches}
          brokenReferences={brokenReferences}
          isMultiple={isMultiple}
          itemsToDelete={itemsToDelete}
          linksAndReferencesViewLink={!isMultiple && linksAndReferencesViewLink}
        />
      )}
    </>
  );
};

const ContentsDeleteModal = (props) => {
  const {
    itemsToDelete = [],
    open,
    onCancel,
    onOk,
    items,
    hasMultiplePages,
  } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const linkintegrityInfo = useSelector((state) => state.linkIntegrity?.result);
  const loading = useSelector((state) => state.linkIntegrity?.loading);

  const [brokenReferences, setBrokenReferences] = useState(0);
  const [containedItemsToDelete, setContainedItemsToDelete] = useState([]);
  const [breaches, setBreaches] = useState([]);

  const [linksAndReferencesViewLink, setLinkAndReferencesViewLink] =
    useState(null);

  const titlesToDelete = useMemo(
    () =>
      itemsToDelete.reduce((acc, id) => {
        const item = items.find((item) => item['@id'] === id);
        acc[id] = item ? item.Title : null;
        return acc;
      }, {}),
    [itemsToDelete, items],
  );

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
      // Filter out breaches where breach.source is to be deleted
      const filteredBreaches = breaches.filter(
        (breach) =>
          !itemsToDelete.some((item) => breach.source['@id'].endsWith(item)),
      );
      // If no breaches are found, return early
      if (filteredBreaches.length === 0) {
        setContainedItemsToDelete([]);
        setBrokenReferences(0);
        setLinkAndReferencesViewLink(null);
        setBreaches([]);
        return;
      }
      const source_by_uid = filteredBreaches.reduce(
        (acc, value) => acc.set(value.source.uid, value.source),
        new Map(),
      );
      const by_source = filteredBreaches.reduce((acc, value) => {
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
  }, [itemsToDelete, linkintegrityInfo]);

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

            {itemsToDelete.length > 1 &&
            items.length === itemsToDelete.length ? (
              <DeleteAllMessage hasMultiplePages={hasMultiplePages} />
            ) : (
              <DeleteItemsList
                itemsToDelete={itemsToDelete}
                titlesToDelete={titlesToDelete}
              />
            )}

            <DeleteMessage
              isMultiple={itemsToDelete.length > 1}
              containedItemsToDelete={containedItemsToDelete}
              brokenReferences={brokenReferences}
              breaches={breaches}
              itemsToDelete={itemsToDelete}
              linksAndReferencesViewLink={linksAndReferencesViewLink}
            />
          </div>
        }
        onCancel={onCancel}
        onConfirm={onOk}
        size="medium"
      />
    )
  );
};

const BrokenLinksList = ({
  intl,
  breaches,
  brokenReferences,
  isMultiple,
  itemsToDelete,
  linksAndReferencesViewLink,
}) => {
  return (
    <div className="broken-links-list">
      <FormattedMessage
        {...messages[
          isMultiple ? 'brokenReferencesMultiple' : 'brokenReferencesSingle'
        ]}
        values={{
          brokenReferences: <span>{brokenReferences}</span>,
          variation: (
            <VariationMessage
              count={brokenReferences}
              singularId="reference"
              pluralId="references"
            />
          ),
        }}
      />
      <br />
      <FormattedMessage
        id="These items will have broken links"
        defaultMessage="These items will have broken links"
      />
      <Table compact>
        <Table.Body>
          {breaches.slice(0, MAX_BREACHES_TO_SHOW).map((breach) => (
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
          {breaches.length > MAX_BREACHES_TO_SHOW && (
            <Table.Row>
              <Table.Cell colSpan="3">
                <FormattedMessage
                  id="and {count} more…"
                  defaultMessage="and {count} more…"
                  values={{
                    count: breaches.length - MAX_BREACHES_TO_SHOW,
                  }}
                />
              </Table.Cell>
            </Table.Row>
          )}
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
