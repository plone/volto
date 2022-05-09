import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Checkbox, Form, Input } from 'semantic-ui-react';

import { isEqual, pull } from 'lodash';

import { messages } from '@plone/volto/helpers';
import { listGroups } from '@plone/volto/actions';
import UserGroupMembershipListing from './UserGroupMembershipListing';

const UserGroupMembershipMatrix = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [query_user, setQuery_user] = useState('');
  const [query_group, setQuery_group] = useState('');
  const [query_group_filter, setQuery_group_filter] = useState('');
  const [groups_filter, setGroups_filter] = useState([]); // Show users which are in these groups.

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
    dispatch(listGroups('', query_group_filter));
  }, [dispatch, query_group_filter, props]);

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
        break;
      default:
        break;
    }
  };

  const onChangeSearchUsers = (event) => {
    setQuery_user(event.target.value);
  };

  const onChangeSearchGroups = (event) => {
    setQuery_group(event.target.value);
  };

  const onSelectOptionHandler = (filter_option, checked) => {
    let groups_filter_set_new = [];
    if (checked) {
      groups_filter_set_new = new Set([...groups_filter, filter_option.value]);
    } else {
      groups_filter_set_new = pull(groups_filter, filter_option.value);
    }
    if (!isEqual(groups_filter_set_new, new Set(groups_filter))) {
      setGroups_filter([...groups_filter_set_new]);
    }
  };

  const onChangeSearchGroupsFilter = (event) => {
    setQuery_group_filter(event.target.value);
  };

  return (
    <div className="usergroupmembership_matrix">
      <div className="usergroupmembership_search_user">
        <Form className="search_users" onSubmit={onReset}>
          <Form.Field>
            <Input
              name="SearchUser"
              action={{ icon: 'delete' }}
              placeholder={intl.formatMessage(messages.searchUsers)}
              onChange={onChangeSearchUsers}
              id="user-search-input"
            />
          </Form.Field>
        </Form>
      </div>
      <div className="usergroupmembership_search_group">
        <Form className="search_groups" onSubmit={onReset}>
          <Form.Field>
            <Input
              name="SearchGroup"
              action={{ icon: 'delete' }}
              placeholder={intl.formatMessage(messages.searchGroups)}
              onChange={onChangeSearchGroups}
              id="group-search-input"
            />
          </Form.Field>
        </Form>
      </div>
      <div className="usergroupmembership_filter">
        <h3>{intl.formatMessage(messages.filterByGroups)}</h3>

        <Form className="search_filter_groups" onSubmit={onReset}>
          <Form.Field>
            <Input
              name="SearchGroupFilter"
              action={{ icon: 'delete' }}
              placeholder={intl.formatMessage(messages.searchGroups)}
              onChange={onChangeSearchGroupsFilter}
              id="groupfilter-search-input"
            />
          </Form.Field>
        </Form>

        {filter_options?.map((filter_option) => (
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
        ))}
      </div>
      <UserGroupMembershipListing
        query_user={query_user}
        query_group={query_group}
        groups_filter={groups_filter}
      />
    </div>
  );
};

export default UserGroupMembershipMatrix;
