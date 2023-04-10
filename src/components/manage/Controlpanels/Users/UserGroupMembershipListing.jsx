import React, { useEffect, useState } from 'react';
import { cloneDeep, uniqBy } from 'lodash';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Button, Checkbox } from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';
import { listGroups } from '@plone/volto/actions';
import { Icon, Toast } from '@plone/volto/components';
import { updateGroup, listUsers } from '@plone/volto/actions';

import add from '@plone/volto/icons/add.svg';
import remove from '@plone/volto/icons/remove.svg';
import down_key from '@plone/volto/icons/down-key.svg';

const ListingTemplate = ({
  query_user, // Show users on y-axis that match
  query_group, // Show groups on y-axis that match
  groups_filter, // show members of these groups
  add_joined_groups, // Toggle: show also groups joined by users below
  many_users,
  many_groups,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const pageSize = 25;
  const [userLimit, setUserLimit] = useState(pageSize);

  // y axis
  let items = useSelector((state) => state.users.users);
  let show_users =
    !many_users ||
    (many_users && query_user.length > 1) ||
    (many_users && groups_filter.length > 0); // Stay with '> 0', as these are already groups, not querystring to search for groups.
  if (show_users) {
    items.sort(function (a, b) {
      var labelA =
        (a.fullname && a.fullname.split(' ').reverse().join(' ')) || a.id;
      var labelB =
        (b.fullname && b.fullname.split(' ').reverse().join(' ')) || b.id;
      if (labelA < labelB) {
        return -1;
      }
      if (labelA > labelB) {
        return 1;
      }
      return 0;
    });
  } else {
    items = [];
  }

  // x axis
  let groups = useSelector((state) => state.groups.groups);
  let show_matrix_options =
    !many_groups ||
    (many_groups && query_group.length > 1) ||
    groups_filter.length > 0 ||
    add_joined_groups;
  let matrix_options; // list of Objects (value, label)
  if (show_matrix_options) {
    matrix_options =
      !many_groups || (many_groups && query_group.length > 1)
        ? cloneDeep(groups)
        : [];
    if (add_joined_groups) {
      items.map((item) => {
        matrix_options.push(...item.groups.items);
        return item.groups.items;
      });
    }
    matrix_options = matrix_options.map((group) => ({
      value: group.id,
      label: group.title || `${group.id}`,
    }));
    if (groups_filter.length > 0) {
      matrix_options = groups_filter.concat(matrix_options);
    }
    matrix_options = uniqBy(matrix_options, (x) => x.value);
    matrix_options = matrix_options.filter((group) => {
      return group.value !== 'AuthenticatedUsers';
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
  } else {
    matrix_options = [];
  }

  useEffect(() => {
    // Get users.
    if (show_users) {
      dispatch(
        listUsers({
          search: query_user,
          groups_filter: groups_filter.map((el) => el.value),
          limit: userLimit,
        }),
      );
    }
  }, [dispatch, query_user, groups_filter, show_users, userLimit]);

  useEffect(() => {
    // Get matrix groups.
    if (show_matrix_options) {
      dispatch(listGroups(query_group));
    }
  }, [dispatch, query_group, show_matrix_options, groups_filter]);

  const onSelectOptionHandler = (item, selectedvalue, checked, singleClick) => {
    singleClick = singleClick ?? false;
    let group = selectedvalue.y;
    let username = selectedvalue.x;

    dispatch(
      updateGroup(group, {
        users: {
          [username]: checked ? true : false,
        },
      }),
    )
      .then((resp) => {
        singleClick &&
          dispatch(
            listUsers({
              search: query_user,
              groups_filter: groups_filter.map((el) => el.value),
              limit: userLimit,
            }),
          );
      })
      .then(() => {
        singleClick &&
          toast.success(
            <Toast
              success
              title={intl.formatMessage(messages.success)}
              content={intl.formatMessage(messages.membershipUpdated)}
            />,
          );
      });
  };

  const onSelectAllHandler = (mtxoption, checked) => {
    let elements = document.querySelectorAll(`div.checkbox_${mtxoption} input`);
    let identifier;
    let usersgroupmapping = {};
    elements.forEach((element) => {
      identifier = element.name.split('_-_');
      usersgroupmapping[identifier[1]] = checked ? true : false;
    });

    dispatch(
      updateGroup(identifier[2], {
        users: usersgroupmapping,
      }),
    )
      .then(() => {
        dispatch(
          listUsers({
            search: query_user,
            groups_filter: groups_filter.map((el) => el.value),
            limit: userLimit,
          }),
        );
      })
      .then(() => {
        toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content={intl.formatMessage(messages.membershipUpdated)}
          />,
        );
      });
  };

  return (
    <div className="administration_matrix">
      {matrix_options && matrix_options?.length > 0 && (
        <div className="label-options">
          {matrix_options?.map((matrix_option) => (
            <div
              className="label-options-label inclined"
              key={matrix_option.value}
            >
              <div>
                <span className="label">{matrix_option.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="items">
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
                          intl.formatMessage(messages.addUsersToGroup) +
                          ` ${matrix_option.label}`
                        }
                        title={
                          intl.formatMessage(messages.addUsersToGroup) +
                          ` ${matrix_option.label}`
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
                          intl.formatMessage(messages.removeUsersFromGroup) +
                          ` ${matrix_option.label}`
                        }
                        title={
                          intl.formatMessage(messages.removeUsersFromGroup) +
                          ` ${matrix_option.label}`
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

            <h3>{items.length} users </h3>
            {items.map((item) => (
              <div className="listing-row" key={item.id}>
                <div className="listing-item" key={item['@id']}>
                  <div>
                    <h4>
                      {item.fullname} ({item.id})
                    </h4>
                  </div>
                  <div className="matrix_options">
                    {matrix_options?.map((matrix_option) => (
                      <Checkbox
                        name={`member_-_${item.id}_-_${matrix_option.value}`}
                        className={`checkbox_${matrix_option.value}`}
                        key={matrix_option.value}
                        title={matrix_option.title}
                        checked={item.groups?.items
                          ?.map((el) => el.id)
                          .includes(matrix_option.value)}
                        onChange={(event, { checked }) => {
                          onSelectOptionHandler(
                            item,
                            { y: matrix_option.value, x: item.id },
                            checked,
                            true,
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {!(items.length < pageSize) ? (
              <div className="show-more">
                <Button
                  icon
                  basic
                  onClick={() => setUserLimit(userLimit + pageSize)}
                  className="show-more-button"
                >
                  <Icon name={down_key} size="30px" />
                </Button>
              </div>
            ) : null}
          </>
        ) : (
          <div>
            {intl.formatMessage(
              show_users
                ? query_user
                  ? messages.noUserFound
                  : messages.pleaseSearchOrFilterUsers
                : messages.pleaseSearchOrFilterUsers,
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default ListingTemplate;
