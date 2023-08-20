import React, { useEffect, useState } from 'react';
import { cloneDeep, uniqBy } from 'lodash';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  Container,
  Table,
  Checkbox,
  Segment,
  Button,
  Label,
  Header,
} from 'semantic-ui-react';
import { messages } from '@plone/volto/helpers';
import { listGroups } from '@plone/volto/actions';
import { Icon, Toast } from '@plone/volto/components';
import { updateGroup, listUsers } from '@plone/volto/actions';
import { FormattedMessage } from 'react-intl';

import down_key from '@plone/volto/icons/down-key.svg';

const ListingTemplate = ({
  query_user, // Show users on y-axis that match
  query_group, // Show groups on y-axis that match
  groups_filter, // show members of these groups
  many_users,
  many_groups,
  allUsers,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const pageSize = 25;
  const [userLimit, setUserLimit] = useState(pageSize);

  // y axis
  let items = allUsers;
  let show_users =
    !many_users ||
    (many_users && query_user.length > 1) ||
    (many_users && groups_filter.length > 0) ||
    (many_users && query_group.length > 0); // Stay with '> 0', as these are already groups, not querystring to search for groups.
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
    groups_filter.length > 0;
  let matrix_options; // list of Objects (value, label)

  if (show_matrix_options) {
    matrix_options =
      !many_groups || (many_groups && query_group.length > 1)
        ? cloneDeep(groups)
        : [];

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
    dispatch(
      listUsers({
        search: query_user,
        groups_filter: groups_filter.map((el) => el.value),
        limit: userLimit,
      }),
    );
  }, [dispatch, query_user, groups_filter, show_users, userLimit]);

  useEffect(() => {
    // Get matrix groups.
    dispatch(listGroups(query_group));
  }, [dispatch, query_group, show_matrix_options, groups_filter]);

  const onSelectOptionHandler = (selectedvalue, checked, singleClick) => {
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

  const onSelectAllHandler = (group, items_ids, checked) => {
    let usersgroupmapping = {};
    items_ids.forEach((el) => {
      usersgroupmapping[el] = checked ? true : false;
    });

    dispatch(
      updateGroup(group, {
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

  const getTitle = (item) => {
    const fullName = item.fullname || item.id;
    return fullName.length > 25 ? `${fullName.slice(0, 22)}...` : fullName;
  };

  return (
    <Container className="administration_matrix">
      {matrix_options && matrix_options?.length > 0 ? (
        <>
          <Segment>
            <FormattedMessage id="Total Users" defaultMessage="Total Users" />
            <span>: {items.length} users</span>
          </Segment>
          <div className="table">
            {items.length > 0 ? (
              <Table striped padded>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>
                      <FormattedMessage id="Users" defaultMessage="Users" />
                    </Table.HeaderCell>
                    {matrix_options?.map((matrix_option) => (
                      <Table.HeaderCell key={matrix_option.value}>
                        {matrix_option.label}
                      </Table.HeaderCell>
                    ))}
                  </Table.Row>
                </Table.Header>

                <Table.Body>
                  <>
                    {items.length > 1 ? (
                      <Table.Row>
                        <Table.Cell>
                          <Label ribbon>
                            <Header size="small" className="select_all">
                              <FormattedMessage
                                id="Select All"
                                defaultMessage="Select All"
                              />
                            </Header>
                          </Label>
                        </Table.Cell>
                        {matrix_options?.map((matrix_option) => (
                          <Table.Cell key={matrix_option.value}>
                            <Checkbox
                              className="toggle-target"
                              defaultChecked={false}
                              onChange={(event, { checked }) =>
                                onSelectAllHandler(
                                  matrix_option.value,
                                  items.map((el) => el.id),
                                  checked,
                                )
                              }
                            />
                          </Table.Cell>
                        ))}
                      </Table.Row>
                    ) : null}
                  </>
                  {items.length > 0 ? (
                    <>
                      {items.map((item) => (
                        <Table.Row key={item.id}>
                          <Table.Cell key={item['@id']} className="user_cell">
                            <span title={`${getTitle(item)} ${item.id}`}>
                              {getTitle(item)}
                            </span>
                          </Table.Cell>
                          {matrix_options?.map((matrix_option) => (
                            <Table.Cell key={matrix_option.value}>
                              <Checkbox
                                className={`checkbox_${matrix_option.value}`}
                                key={matrix_option.value}
                                title={matrix_option.title}
                                checked={item.groups?.items
                                  ?.map((el) => el.id)
                                  .includes(matrix_option.value)}
                                onChange={(event, { checked }) => {
                                  onSelectOptionHandler(
                                    { y: matrix_option.value, x: item.id },
                                    checked,
                                    true,
                                  );
                                }}
                              />
                            </Table.Cell>
                          ))}
                        </Table.Row>
                      ))}
                    </>
                  ) : null}
                </Table.Body>
              </Table>
            ) : null}
          </div>
        </>
      ) : (
        <div className="no_users">
          {intl.formatMessage(
            show_users
              ? query_user
                ? messages.noUserFound
                : messages.pleaseSearchOrFilterUsers
              : messages.pleaseSearchOrFilterUsers,
          )}
        </div>
      )}

      {!(items.length < userLimit) ? (
        <div className="show_more_div">
          <Button
            icon
            onClick={() => setUserLimit((prevLimit) => prevLimit + pageSize)}
            class="ui button more"
          >
            <FormattedMessage id="Show More" defaultMessage="Show More" />
            <Icon name={down_key} size="20px" />
          </Button>
        </div>
      ) : null}
    </Container>
  );
};
export default ListingTemplate;
