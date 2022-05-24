import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Checkbox } from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';
import { listGroups } from '@plone/volto/actions';
import { Toast } from '@plone/volto/components';
import { updateGroup, listUsers } from '@plone/volto/actions';
import { uniqBy } from 'lodash';

const ListingTemplate = ({
  query_user,
  query_group,
  groups_filter,
  many_users,
  many_groups,
  add_joined_groups,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  // y axis
  let items = useSelector((state) => state.users.users);
  let show_users =
    !many_users || query_user.length > 0 || groups_filter.length > 0;
  if (show_users) {
    items.sort(function (a, b) {
      var labelA = a.fullname.split(' ').reverse().join(' ');
      var labelB = b.fullname.split(' ').reverse().join(' ');
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
    query_group.length > 0 ||
    groups_filter.length > 0 ||
    add_joined_groups;
  let matrix_options; // list of Objects (value, label)
  if (show_matrix_options) {
    matrix_options = !many_groups || query_group.length > 0 ? groups : [];
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
        listUsers(
          query_user,
          groups_filter.map((el) => el.value),
        ),
      );
    }
  }, [dispatch, query_user, groups_filter, show_users]);

  useEffect(() => {
    // Get matrix groups.
    if (show_matrix_options) {
      dispatch(listGroups(query_group));
    }
  }, [
    dispatch,
    query_group,
    show_matrix_options,
    groups_filter,
    add_joined_groups,
  ]);

  const onSelectOptionHandler = (item, selectedvalue, checked) => {
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
        dispatch(
          listUsers(
            query_user,
            groups_filter.map((el) => el.value),
          ),
        );
      })
      .then(() => {
        toast.success(
          <Toast
            success
            title={intl.formatMessage(messages.success)}
            content="Membership updated"
          />,
        );
      });
  };

  const onSelectAllHandler = (mtxoption, checked) => {
    let elements = document.querySelectorAll(`div.checkbox_${mtxoption} input`);
    let identifier;
    elements.forEach((element) => {
      element.checked = checked;
      identifier = element.name.split('_-_');
      dispatch(
        updateGroup(identifier[2], {
          users: {
            [identifier[1]]: checked ? true : false,
          },
        }),
      );
    });
    toast.success(
      <Toast
        success
        title={intl.formatMessage(messages.success)}
        content="Membership updated"
      />,
    );
  };

  return (
    <div className="administration_matrix">
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

      <div className="items">
        {items.length > 0 ? (
          <>
            <div className="listing-row selectall" key="selectall">
              <div className="listing-item">
                <div />
                <div className="matrix_options">
                  {matrix_options?.map((matrix_option) => (
                    <div
                      title={
                        intl.formatMessage(messages.addUsersToGroup) +
                        ` ${matrix_option.label}`
                      }
                    >
                      <Checkbox
                        name={`member_selectall_${matrix_option.value}`}
                        key={matrix_option.value}
                        title={matrix_option.label}
                        defaultChecked={false}
                        onChange={(event, { checked }) => {
                          onSelectAllHandler(matrix_option.value, checked);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
                        defaultChecked={item.groups?.items
                          ?.map((el) => el.id)
                          .includes(matrix_option.value)}
                        onChange={(event, { checked }) => {
                          onSelectOptionHandler(
                            item,
                            { y: matrix_option.value, x: item.id },
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
