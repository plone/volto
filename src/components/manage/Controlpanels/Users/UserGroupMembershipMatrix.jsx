import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Checkbox, Form, Input } from 'semantic-ui-react';

import { isEqual } from 'lodash';

import { messages } from '@plone/volto/helpers';
import { listGroups } from '@plone/volto/actions'; // getRegistry
import UserGroupMembershipListing from './UserGroupMembershipListing';

const UserGroupMembershipMatrix = ({ many_users, many_groups }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [query_user, setQuery_user] = useState(''); // Show users matching the search string
  const [query_group, setQuery_group] = useState(''); // Show groups matching the search string
  const [query_group_filter, setQuery_group_filter] = useState(''); // Offer groups matching the search string to filter users
  const [groups_filter, setGroups_filter] = useState([]); // Show users joining these groups.
  const [add_joined_groups, setAdd_joined_groups] = useState(false);

  let filter_options = useSelector((state) => state.groups.filter_groups);
  if (filter_options) {
    filter_options = filter_options.map((group) => ({
      value: group.id,
      label: group.title || group.id,
    }));
    filter_options.sort(function (a, b) {
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
  }

  useEffect(() => {
    // TODO fetch group for at least query_group_filter.length > 1?
    if (!many_groups || (many_groups && query_group_filter.length > 1)) {
      dispatch(listGroups('', query_group_filter));
    }
  }, [dispatch, many_groups, query_group_filter]);

  const onReset = (event) => {
    // event.preventDefault();
    let element = event.target.querySelector('input');
    element.value = '';
    element.focus();
    let searchtype = element.name;
    switch (searchtype) {
      case 'SearchUser':
        setQuery_user('');
        break;
      case 'SearchGroup':
        setQuery_group('');
        break;
      case 'SearchGroupFilter':
        setQuery_group_filter('');
        setGroups_filter([]);
        break;
      default:
        break;
    }
  };

  const onChangeSearchUsers = (event) => {
    if (many_users || many_groups) {
      // search only on hitting return key
      if (event.keyCode === 13) {
        setQuery_user(event.target.value);
        event.preventDefault();
      }
    } else {
      setQuery_user(event.target.value);
    }
  };

  const onChangeSearchGroups = (event) => {
    if (many_users || many_groups) {
      // search only on hitting return key
      if (event.keyCode === 13) {
        setQuery_group(event.target.value);
        event.preventDefault();
      }
    } else {
      setQuery_group(event.target.value);
    }
  };

  const onSelectOptionHandler = (filter_option, checked) => {
    let groups_filter_set_new = [];
    if (checked) {
      groups_filter_set_new = new Set([...groups_filter, filter_option]);
    } else {
      groups_filter_set_new = groups_filter.filter(
        (el) => el.value !== filter_option.value,
      );
    }
    if (!isEqual(groups_filter_set_new, new Set(groups_filter))) {
      setGroups_filter([...groups_filter_set_new]);
    }
  };
  const onToggleJoinedGroups = (checked) => {
    setAdd_joined_groups(checked);
  };

  const onChangeSearchGroupsFilter = (event) => {
    if (many_users || many_groups) {
      // search only on hitting return key
      if (event.keyCode === 13) {
        setQuery_group_filter(event.target.value);
        event.preventDefault();
      }
    } else {
      setQuery_group_filter(event.target.value);
    }
  };

  return (
    <div className="controlpanel_matrix">
      <div className="controlpanel_search_wrapper">
        <div className="controlpanel_search_y">
          <Form className="search_users" onSubmit={onReset}>
            <Form.Field>
              <Input
                name="SearchUser"
                action={{ icon: 'delete' }}
                placeholder={intl.formatMessage(messages.searchUsers)}
                onChange={onChangeSearchUsers}
                onKeyDown={onChangeSearchUsers}
                id="user-search-input"
              />
            </Form.Field>
          </Form>
        </div>
        <div className="controlpanel_search_x">
          <Form className="search_groups" onSubmit={onReset}>
            <Form.Field>
              <Input
                name="SearchGroup"
                action={{ icon: 'delete' }}
                placeholder={intl.formatMessage(messages.searchGroups)}
                onChange={onChangeSearchGroups}
                onKeyDown={onChangeSearchGroups}
                id="group-search-input"
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                name="addJoinedGroups"
                label={intl.formatMessage(messages.addJoinedGroups)}
                title={intl.formatMessage(messages.addJoinedGroups)}
                defaultChecked={false}
                onChange={(event, { checked }) => {
                  onToggleJoinedGroups(checked);
                }}
              />
            </Form.Field>
          </Form>
        </div>
      </div>
      <div className="controlpanel_listing_wrapper">
        <div className="controlpanel_filter">
          <h3>{intl.formatMessage(messages.filterByGroups)}</h3>
          <Form className="search_filter_groups" onSubmit={onReset}>
            <Form.Field>
              <Input
                name="SearchGroupFilter"
                action={{ icon: 'delete' }}
                placeholder={intl.formatMessage(messages.searchGroups)}
                onChange={onChangeSearchGroupsFilter}
                onKeyDown={onChangeSearchGroupsFilter}
                id="groupfilter-search-input"
              />
            </Form.Field>
          </Form>
          {(!many_groups || query_group_filter.length > 1) &&
            filter_options?.map((filter_option) => (
              <Form.Field>
                <Checkbox
                  name={`filter_option_${filter_option.value}`}
                  key={filter_option.value}
                  title={filter_option.label}
                  label={filter_option.label}
                  defaultChecked={false}
                  onChange={(event, { checked }) => {
                    onSelectOptionHandler(filter_option, checked);
                  }}
                />
              </Form.Field>
            ))}
        </div>
        <UserGroupMembershipListing
          query_user={query_user}
          query_group={query_group}
          groups_filter={groups_filter}
          add_joined_groups={add_joined_groups}
          many_users={many_users}
          many_groups={many_groups}
        />
      </div>
    </div>
  );
};

export default UserGroupMembershipMatrix;
