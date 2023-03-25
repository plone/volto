import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { uniqBy } from 'lodash';
import { Button, Checkbox, Message } from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';
import { Icon, Toast, UniversalLink } from '@plone/volto/components';
import {
  createRelations,
  deleteRelations,
  queryRelations,
  searchContent,
} from '@plone/volto/actions';
import add from '@plone/volto/icons/add.svg';
import remove from '@plone/volto/icons/remove.svg';

const ListingTemplate = ({
  relationtype,
  query_source,
  query_target,
  potential_sources_path,
  potential_targets_path,
  target_filter,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const MAX = 50;

  let relations = useSelector(
    (state) =>
      (state.relations?.relations?.items
        ? state.relations?.relations?.items[relationtype]
        : []) || [],
  );
  relations = relations.filter((el) => {
    let matched = true;
    if (query_source) {
      matched =
        matched &&
        (el.source.title.toLowerCase().indexOf(query_source.toLowerCase()) >
          -1 ||
          el.source['@id'].toLowerCase().indexOf(query_source.toLowerCase()) >
            -1);
    }
    return matched;
  });

  let potential_targets_objects = useSelector(
    (state) => state.search.subrequests.potential_targets?.items || [],
  );

  let potential_sources_objects = useSelector(
    (state) => state.search.subrequests.potential_sources?.items || [],
  );

  const staticCatalogVocabularyQuery = useSelector(
    (state) => state.relations?.relations?.staticCatalogVocabularyQuery || {},
  );

  // Editable if plone.api.relations available
  const editable = useSelector(
    (state) => state.relations?.relations?.readonly === false,
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
  matrix_options = [...matrix_options, ...potential_targets];
  matrix_options = uniqBy(matrix_options, function (el) {
    return el.value;
  });

  matrix_options = matrix_options.filter((el) => {
    let matched = true;
    if (query_target) {
      matched =
        matched &&
        (el.label.toLowerCase().indexOf(query_target.toLowerCase()) > -1 ||
          el.url.toLowerCase().indexOf(query_target.toLowerCase()) > -1);
    }
    return matched;
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
    targets: [],
    url: obj['@id'],
    review_state: obj.review_state,
  }));
  items = [...items, ...potential_sources];
  items = uniqBy(items, function (el) {
    return el.value;
  });
  items = items.filter((el) => {
    let matched = true;
    if (query_source) {
      matched =
        matched &&
        (el.label.toLowerCase().indexOf(query_source.toLowerCase()) > -1 ||
          el.url.toLowerCase().indexOf(query_source.toLowerCase()) > -1);
    }
    return matched;
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
    dispatch(queryRelations(relationtype));
  }, [dispatch, relationtype]); // query_source

  // Get potential target objects
  // TODO restrict to vocabulary
  useEffect(() => {
    // Fetch fresh potential targets
    if (potential_targets_path !== '/' && potential_targets_path !== '') {
      dispatch(
        searchContent(
          potential_targets_path,
          {
            metadata_fields: ['UID'],
            sort_on: 'getObjPositionInParent',
            ...staticCatalogVocabularyQuery,
          },
          'potential_targets',
        ),
      );
    } else {
      dispatch(searchContent('/findstenichätsch', null, 'potential_targets'));
    }

    // Fetch fresh potential sources
    if (potential_sources_path !== '/' && potential_sources_path !== '') {
      dispatch(
        searchContent(
          potential_sources_path,
          {
            metadata_fields: ['UID'],
            sort_on: 'getObjPositionInParent',
            // No need to restrict here. ...staticCatalogVocabularyQuery,
          },
          'potential_sources',
        ),
      );
    } else {
      dispatch(searchContent('/findstenichätsch', null, 'potential_sources'));
    }
  }, [
    dispatch,
    potential_targets_path,
    potential_sources_path,
    staticCatalogVocabularyQuery,
  ]);

  const onSelectOptionHandler = (relation, item, selectedvalue, checked) => {
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
        dispatch(queryRelations(relationtype));
      })
      .then(() => {
        toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content="Relations updated"
          />,
        );
      });
  };

  const onSelectAllHandler = (mtxoption, checked) => {
    toast.warning(
      <Toast
        warning
        title="Create or remove relations for all shown sources"
        content="not yet implemented"
      />,
    );
    let elements = document.querySelectorAll(`div.checkbox_${mtxoption} input`);
    // let identifier;
    elements.forEach((element) => {
      element.checked = checked;
      // identifier = element.name.split('_-_');
      // TODO update relations
      // dispatch(
      //   updateGroup(identifier[2], {
      //     users: {
      //       [identifier[1]]: checked ? true : false,
      //     },
      //   }),
      // );
    });
  };

  return matrix_options.length < MAX && items.length < MAX ? (
    <div className="administration_matrix">
      <div className="label-options" key="label-options">
        {matrix_options?.map((matrix_option) => (
          <div
            className="label-options-label inclined"
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
              >
                <span className="label" title={matrix_option.value}>
                  {matrix_option.label}
                </span>
              </UniversalLink>
            </div>
          </div>
        ))}
      </div>

      <div className="items" key="items">
        {items.length > 0 ? (
          <>
            {!editable && (
              <Message warning>
                <FormattedMessage
                  id="Relations are editable with plone.api >= 2.0.0."
                  defaultMessage="Relations are editable with plone.api >= 2.0.0."
                />
              </Message>
            )}
            <div className="listing-row selectall" key="selectall">
              <div className="listing-item">
                <div />

                <div className="matrix_options">
                  {matrix_options?.map((matrix_option) => (
                    <div key={matrix_option.value}>
                      <Button
                        icon
                        basic
                        onClick={() =>
                          onSelectAllHandler(matrix_option.value, true)
                        }
                        className="add-button"
                        aria-label={
                          intl.formatMessage(messages.createRelationsToTarget) +
                          ` '${matrix_option.label}'`
                        }
                        title={
                          intl.formatMessage(messages.createRelationsToTarget) +
                          ` '${matrix_option.label}'`
                        }
                      >
                        <Icon
                          name={add}
                          size="10px"
                          className="circled"
                          color="unset"
                        />
                      </Button>
                      <Button
                        icon
                        basic
                        onClick={() =>
                          onSelectAllHandler(matrix_option.value, false)
                        }
                        className="remove-button"
                        aria-label={
                          intl.formatMessage(messages.removeRelationsToTarget) +
                          ` '${matrix_option.label}'`
                        }
                        title={
                          intl.formatMessage(messages.removeRelationsToTarget) +
                          ` '${matrix_option.label}'`
                        }
                      >
                        <Icon
                          name={remove}
                          size="10px"
                          className="circled"
                          color="unset"
                        />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {items.map((item) => (
              <div className="listing-row" key={item.id}>
                <div className="listing-item" key={item['@id']}>
                  <div>
                    <span title={item.value}>
                      <UniversalLink
                        href={item.url}
                        className={
                          item.review_state !== 'published'
                            ? 'not-published'
                            : ''
                        }
                      >
                        {item.label}
                      </UniversalLink>
                      {/* <span>targets: {item.targets.join(', ')}</span> */}
                    </span>
                  </div>
                  <div className="matrix_options">
                    {matrix_options?.map((matrix_option) => (
                      <React.Fragment key={matrix_option.value}>
                        <Checkbox
                          name={`member_-_${item.value}_-_${matrix_option.value}`}
                          className={`checkbox_${matrix_option.value}`}
                          key={matrix_option.value}
                          title={matrix_option.title}
                          disabled={
                            relationtype === 'isReferencing' || !editable
                          }
                          checked={item.targets.includes(matrix_option.value)}
                          onChange={(event, { checked }) => {
                            onSelectOptionHandler(
                              relationtype,
                              item,
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
        ) : (
          <div>{intl.formatMessage(messages.norelationfound)}</div>
        )}
      </div>
    </div>
  ) : (
    <p>
      <FormattedMessage
        id="narrowDownRelations"
        defaultMessage="Found {sources} sources and {targets} targets. Narrow down to {max}!"
        values={{
          sources: items.length,
          targets: matrix_options.length,
          max: MAX,
        }}
      />
    </p>
  );
};
export default ListingTemplate;
