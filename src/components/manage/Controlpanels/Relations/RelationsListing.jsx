import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { uniq, uniqBy } from 'lodash';
import { Button, Checkbox } from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';
import { Icon, Toast, UniversalLink } from '@plone/volto/components';
import { listRelations } from '@plone/volto/actions';
import add from '@plone/volto/icons/add.svg';
import remove from '@plone/volto/icons/remove.svg';

const ListingTemplate = ({
  query_source,
  query_target,
  target_filter,
  relationtype,
}) => {
  // console.debug('ListingTemplate');
  // console.debug(
  //   'query_source, query_target, target_filter, relationtype ',
  //   query_source,
  //   query_target,
  //   target_filter,
  //   relationtype,
  // );
  const intl = useIntl();
  const dispatch = useDispatch();

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
        el.source.title.toLowerCase().indexOf(query_source.toLowerCase()) > -1;
    }
    return matched;
  });

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

  // x-axis
  let matrix_options = relations.map((relation) => ({
    value: relation.target.UID,
    label: relation.target.title,
    url: relation.target['@id'],
  }));
  matrix_options = uniqBy(matrix_options, function (el) {
    return el.value;
  });
  matrix_options = matrix_options.filter((el) => {
    let matched = true;
    if (query_target) {
      matched =
        matched &&
        el.label.toLowerCase().indexOf(query_target.toLowerCase()) > -1;
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

  // y-axis
  let items = Object.keys(relationMatrix).map((key) => ({
    value: key,
    label: relationMatrix[key].source.title,
    targets: relationMatrix[key].targets.map((el) => el.UID),
    url: relationMatrix[key].source['@id'],
  }));
  items = uniq(items);
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
    dispatch(listRelations(relationtype));
  }, [dispatch, relationtype, query_source]);

  const onSelectOptionHandler = (item, selectedvalue, checked) => {
    // let source = selectedvalue.y;
    // let target = selectedvalue.x;
    // console.debug('>> create or delete relation');
    // console.debug(source, target);
    // TODO update relations
    // dispatch(checked ? createRelations() : deleteRelations())
    //   .then((resp) => {
    //     dispatch(listRelations(relationtype, query_source, target_filter));
    //   })
    //   .then(() => {
    //     toast.success(
    //       <Toast
    //         success
    //         title={intl.formatMessage(messages.success)}
    //         content="Relations updated"
    //       />,
    //     );
    //   });
    toast.warning(
      <Toast
        warning
        title="Toggle potential targets"
        content="not yet implemented"
      />,
    );
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

  return (
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
                title={matrix_option['@type']}
              >
                <span className="label">{matrix_option.label}</span>
              </UniversalLink>
            </div>
          </div>
        ))}
      </div>

      <div className="items" key="items">
        {items.length > 0 ? (
          <>
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
                    <h4 title={item.value}>
                      <UniversalLink href={item.url}>
                        {item.label}
                      </UniversalLink>
                    </h4>
                  </div>
                  <div className="matrix_options">
                    {matrix_options?.map((matrix_option) => (
                      <Checkbox
                        name={`member_-_${item.value}_-_${matrix_option.value}`}
                        className={`checkbox_${matrix_option.value}`}
                        key={matrix_option.value}
                        title={matrix_option.title}
                        defaultChecked={item.targets.includes(
                          matrix_option.value,
                        )}
                        onChange={(event, { checked }) => {
                          onSelectOptionHandler(
                            item,
                            { x: matrix_option.value, y: item.value },
                            checked,
                          );
                        }}
                      />
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
  );
};
export default ListingTemplate;
