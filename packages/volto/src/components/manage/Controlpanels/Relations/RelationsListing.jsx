import React, { useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { uniqBy } from 'lodash-es';
import { Checkbox, Message } from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import UniversalLink from '@plone/volto/components/manage/UniversalLink/UniversalLink';
import {
  createRelations,
  deleteRelations,
  queryRelations,
  resetSearchContent,
  searchContent,
} from '@plone/volto/actions';

const RelationsListing = ({
  relationtype,
  query_source,
  query_target,
  potential_sources_path,
  potential_targets_path,
  // target_filter,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const MAX = 40; // Maximum of rows and columns
  const MAX_RELATIONS = 1000;

  const stats = useSelector((state) => state.relations?.stats?.data || null);

  let relations = useSelector(
    (state) => state.relations?.relations?.data?.[relationtype]?.items || [],
  );

  let potential_targets_objects = useSelector(
    (state) => state.search.subrequests.potential_targets?.items || [],
  );

  let potential_sources_objects = useSelector(
    (state) => state.search.subrequests.potential_sources?.items || [],
  );

  const staticCatalogVocabularyQuery = useSelector(
    (state) =>
      state.relations?.relations?.data?.[relationtype]
        ?.staticCatalogVocabularyQuery || {},
  );

  // Editable if plone.api.relations available
  const editable = useSelector(
    (state) =>
      state.relations?.relations?.data?.[relationtype]?.readonly !== true,
  );

  let relationMatrix = {};
  relations.map((tpl) => {
    if (relationMatrix[tpl.source.UID]) {
      relationMatrix[tpl.source.UID].targets.push(tpl.target);
    } else {
      relationMatrix[tpl.source.UID] = {
        source: tpl.source,
        targets: [tpl.target],
      };
    }
    return relationMatrix;
  });

  // x-axis: relation targets
  // ************************
  let matrix_options = relations.map((relation) => ({
    value: relation.target.UID,
    label: relation.target.title,
    url: relation.target['@id'],
    review_state: relation.target.review_state,
    uid: relation.target.UID,
  }));
  matrix_options = uniqBy(matrix_options, function (el) {
    return el.value;
  });

  // Add potential targets
  const potential_targets = potential_targets_objects.map((obj) => ({
    value: obj.UID,
    label: obj.title,
    url: obj['@id'],
    review_state: obj.review_state,
    uid: obj.UID,
  }));
  // Just show potential targets if no querying
  matrix_options =
    query_source === '' &&
    query_target === '' &&
    potential_sources_path !== '' &&
    potential_targets_path !== ''
      ? potential_targets
      : [...matrix_options, ...potential_targets];
  matrix_options = uniqBy(matrix_options, function (el) {
    return el.value;
  });
  matrix_options.sort(function (a, b) {
    var labelA = a.label.toUpperCase();
    var labelB = b.label.toUpperCase();
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });

  // y-axis: relation sources
  // ************************
  let items = Object.keys(relationMatrix).map((key) => ({
    value: key,
    label: relationMatrix[key].source.title,
    targets: relationMatrix[key].targets.map((el) => el.UID),
    url: relationMatrix[key].source['@id'],
    review_state: relationMatrix[key].source.review_state,
  }));
  // Add potential sources
  const potential_sources = potential_sources_objects.map((obj) => ({
    value: obj.UID,
    label: obj.title,
    targets: relationMatrix[obj.UID]?.targets?.map((el) => el.UID) || [],
    url: obj['@id'],
    review_state: obj.review_state,
  }));
  items =
    query_source === '' &&
    query_target === '' &&
    potential_sources_path !== '' &&
    potential_targets_path !== ''
      ? potential_sources
      : [...items, ...potential_sources];
  items = uniqBy(items, function (el) {
    return el.value;
  });
  items.sort(function (a, b) {
    var labelA = a.label.toUpperCase();
    var labelB = b.label.toUpperCase();
    if (labelA < labelB) {
      return -1;
    }
    if (labelA > labelB) {
      return 1;
    }
    return 0;
  });

  useEffect(() => {
    // If many relations, then fetch relations only with search query on source or target
    if (stats?.stats[relationtype] <= MAX_RELATIONS) {
      dispatch(queryRelations(relationtype));
    } else {
      dispatch(
        queryRelations(
          relationtype,
          false,
          null,
          null,
          null,
          query_source
            ? query_source.startsWith('/')
              ? query_source
              : `${query_source}*`
            : null,
          query_target
            ? query_target.startsWith('/')
              ? query_target
              : `${query_target}*`
            : null,
        ),
      );
    }
  }, [dispatch, stats, relationtype, query_source, query_target]);

  // Get potential source and target objects
  useDeepCompareEffect(() => {
    // Fetch fresh potential targets
    if (potential_targets_path !== '/' && potential_targets_path !== '') {
      dispatch(
        searchContent(
          potential_targets_path,
          {
            SearchableText: query_target,
            metadata_fields: ['UID'],
            sort_on: 'sortable_title',
            ...staticCatalogVocabularyQuery,
          },
          'potential_targets',
        ),
      );
    } else {
      dispatch(resetSearchContent('potential_targets'));
    }

    // Fetch fresh potential sources
    if (potential_sources_path !== '/' && potential_sources_path !== '') {
      dispatch(
        searchContent(
          potential_sources_path,
          {
            SearchableText: query_source,
            metadata_fields: ['UID'],
            sort_on: 'sortable_title',
            // No need to restrict here. ...staticCatalogVocabularyQuery,
          },
          'potential_sources',
        ),
      );
    } else {
      dispatch(resetSearchContent('potential_sources'));
    }
  }, [
    dispatch,
    potential_targets_path,
    potential_sources_path,
    staticCatalogVocabularyQuery,
    query_source,
    query_target,
  ]);

  function fetchRelations() {
    dispatch(
      queryRelations(
        relationtype,
        false,
        null,
        null,
        null,
        query_source
          ? query_source.startsWith('/')
            ? query_source
            : `${query_source}*`
          : null,
        query_target
          ? query_target.startsWith('/')
            ? query_target
            : `${query_target}*`
          : null,
      ),
    );
  }

  const onSelectOptionHandler = (relation, selectedvalue, checked) => {
    let source = selectedvalue.y;
    let target = selectedvalue.x;
    const relation_data = [
      {
        source: source,
        target: target,
        relation: relation,
      },
    ];
    dispatch(
      checked ? createRelations(relation_data) : deleteRelations(relation_data),
    )
      .then((resp) => {
        fetchRelations();
      })
      .then(() => {
        toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content={intl.formatMessage(messages.relationsUpdated)}
          />,
        );
      });
  };

  const onSelectAllHandler = (target, items_ids, checked) => {
    let relation_data = [];
    items_ids.forEach((el) => {
      relation_data.push({
        source: el,
        target: target,
        relation: relationtype,
      });
    });
    dispatch(
      checked ? createRelations(relation_data) : deleteRelations(relation_data),
    )
      .then((resp) => {
        fetchRelations();
      })
      .then(() => {
        toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content={intl.formatMessage(messages.relationsUpdated)}
          />,
        );
      });
  };

  return (
    <>
      {/* <div>
        <div>
          <div>{items.length} sources</div>
          <div>{matrix_options.length} targets</div>
        </div>
        <div>
          <div>query_source <b>{query_source}</b></div>
          <div>query_target <b>{query_target}</b></div>
          <div>potential_sources_path <b>{potential_sources_path}</b></div>
          <div>potential_targets_path <b>{potential_targets_path}</b></div>
        </div>
      </div> */}
      {matrix_options.length <= MAX &&
      (items.length <= MAX) & (matrix_options.length > 0) &&
      items.length > 0 ? (
        <div className="administration_matrix">
          <div className="label-options">
            <div className="target-labels">
              <div></div>
              <div>
                {matrix_options?.map((matrix_option) => (
                  <div
                    className="label-options-label inclined"
                    id={`label-options-label-${matrix_option.value}`}
                    key={matrix_option.value}
                  >
                    <div>
                      <UniversalLink
                        href={matrix_option.url}
                        className={
                          matrix_option.review_state !== 'published'
                            ? 'not-published'
                            : ''
                        }
                        target="_blank"
                      >
                        <span className="label" title={matrix_option.label}>
                          {matrix_option.label.length > 30
                            ? matrix_option.label.slice(0, 27) + '...'
                            : matrix_option.label}
                        </span>
                      </UniversalLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="listing-row selectall" key="selectall">
              <div className="listing-item">
                <div />
                <div className="matrix_options">
                  {!(
                    relationtype === 'isReferencing' ||
                    relationtype === 'iterate-working-copy' ||
                    !editable
                  ) ? (
                    matrix_options?.map((matrix_option) => (
                      <div
                        key={matrix_option.value}
                        title={
                          intl.formatMessage(
                            messages.createOrDeleteRelationsToTarget,
                          ) + ` '${matrix_option.label}'`
                        }
                      >
                        <Checkbox
                          className="toggle-target"
                          defaultChecked={false}
                          onChange={(event, { checked }) =>
                            onSelectAllHandler(
                              matrix_option.value,
                              items.map((el) => el.value),
                              checked,
                            )
                          }
                        />
                      </div>
                    ))
                  ) : (
                    <FormattedMessage
                      id="Read only for this type of relation."
                      defaultMessage="Read only for this type of relation."
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="items" key="items">
            <>
              {!editable && (
                <Message warning>
                  <FormattedMessage
                    id="Relations are editable with plone.api >= 2.0.3."
                    defaultMessage="Relations are editable with plone.api >= 2.0.3."
                  />
                </Message>
              )}
              {items.map((item) => (
                <div
                  className="listing-row"
                  key={item.id}
                  id={`source-row-${item.value}`}
                >
                  <div className="listing-item" key={item['@id']}>
                    <div>
                      <span title={item.label} className="item-title">
                        <UniversalLink
                          href={item.url}
                          className={
                            item.review_state !== 'published'
                              ? 'not-published'
                              : ''
                          }
                          target="_blank"
                        >
                          {item.label.length > 25
                            ? item.label.slice(0, 22) + '...'
                            : item.label}
                        </UniversalLink>
                        {/* <span>targets: {item.targets.join(', ')}</span> */}
                      </span>
                    </div>
                    <div className="matrix_options">
                      {matrix_options?.map((matrix_option) => (
                        <React.Fragment key={matrix_option.value}>
                          <Checkbox
                            className={`checkbox_${matrix_option.value}`}
                            key={matrix_option.value}
                            title={matrix_option.title}
                            disabled={
                              relationtype === 'isReferencing' ||
                              relationtype === 'iterate-working-copy' ||
                              !editable
                            }
                            checked={item.targets.includes(matrix_option.value)}
                            onChange={(event, { checked }) => {
                              onSelectOptionHandler(
                                relationtype,
                                { x: matrix_option.value, y: item.value },
                                checked,
                              );
                            }}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        </div>
      ) : (
        <div className="administration_matrix">
          {matrix_options.length > MAX || items.length > MAX ? (
            <FormattedMessage
              id="narrowDownRelations"
              defaultMessage="Found {sources} sources and {targets} targets. Narrow down to {max}!"
              values={{
                sources: items.length,
                targets: matrix_options.length,
                max: MAX,
              }}
            />
          ) : query_source || query_target ? (
            <div>{intl.formatMessage(messages.norelationfound)}</div>
          ) : (
            <div>{intl.formatMessage(messages.toomanyrelationsfound)}</div>
          )}
        </div>
      )}
    </>
  );
};
export default RelationsListing;
