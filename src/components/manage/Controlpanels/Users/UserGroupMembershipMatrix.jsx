import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import { Form, Container } from 'semantic-ui-react';

import { messages } from '@plone/volto/helpers';
import { listGroups } from '@plone/volto/actions'; // getRegistry
import UserGroupMembershipListing from './UserGroupMembershipListing';
import { compose } from 'redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  ClearIndicator,
  customSelectStyles,
  selectTheme,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

const UserGroupMembershipMatrix = ({
  many_users,
  many_groups,
  reactSelect,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const [query_user, setQuery_user] = useState(''); // Show users matching the search string
  const [query_group, setQuery_group] = useState(''); // Show groups matching the search string
  const [query_group_filter, setQuery_group_filter] = useState(''); // Offer groups matching the search string to filter users
  const [groups_filter, setGroups_filter] = useState([]); // Show users joining these groups.

  let filter_options = useSelector((state) => state.groups.groups); //Fetching all groups from the Redux store
  let users = useSelector((state) => state.users.users); //Fetching all users from the Redux store
  const Select = reactSelect.default;

  if (filter_options) {
    filter_options = filter_options.map((group) => ({
      value: group.id,
      label: group.title || group.id,
      key: group.id,
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
  var groups_options = filter_options ? [...filter_options] : [];
  var users_options = users
    ? users.map((user) => ({
        value: user.id,
        label: user.fullname || user.id,
        key: user.id,
      }))
    : [];

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

  const onChangeSearchUsers = (data) => {
    if (data) setQuery_user(data.value);
    else setQuery_user('');
  };

  const onChangeSearchGroups = (data) => {
    if (data) setQuery_group(data.value);
    else setQuery_group('');
  };

  const onChangeUsersByGroup = (event, data) => {
    if (data.action === 'select-option') {
      setGroups_filter([...groups_filter, data.option]);
    } else if (data.action === 'remove-value') {
      setGroups_filter(
        groups_filter.filter((el) => el.value !== data.removedValue.value),
      );
    } else if (data.action === 'clear') {
      setGroups_filter([]);
    }
  };

  return (
    <Container className="controlpanel_matrix">
      {users ? (
        <div className="controlpanel_search_wrapper">
          <div className="controlpanel_filterUsersByGroup">
            <Form className="search_filter_groups" onSubmit={onReset}>
              <Select
                id="controlpanel_filterUsersByGroup"
                // key={options}
                isMulti={true}
                options={groups_options}
                placeholder={intl.formatMessage(messages.filterByGroups)}
                onChange={(event, data) => {
                  onChangeUsersByGroup(event, data);
                }}
                styles={customSelectStyles}
                theme={selectTheme}
              ></Select>
            </Form>
          </div>
          <div className="controlpanel_search_users">
            <Form className="search_users" onSubmit={onReset}>
              <Select
                id="controlpanel_filterUsers"
                options={users_options}
                placeholder={intl.formatMessage(messages.searchUsers)}
                onChange={(data) => {
                  onChangeSearchUsers(data);
                }}
                styles={customSelectStyles}
                theme={selectTheme}
                className="react-select-container"
                classNamePrefix="react-select"
                components={{ ClearIndicator }}
                isClearable
              />
            </Form>
          </div>
          <div className="controlpanel_search_groups">
            <Form className="search_groups" onSubmit={onReset}>
              <Select
                name="SearchGroup"
                id="group-search-input"
                options={groups_options}
                placeholder={intl.formatMessage(messages.searchGroups)}
                onChange={(data) => {
                  onChangeSearchGroups(data);
                }}
                styles={customSelectStyles}
                theme={selectTheme}
                className="react-select-container"
                classNamePrefix="react-select"
                components={{ ClearIndicator }}
                isClearable
              />
            </Form>
          </div>
        </div>
      ) : null}
      {users ? (
        <div className="controlpanel_listing_wrapper">
          <UserGroupMembershipListing
            query_user={query_user}
            query_group={query_group}
            groups_filter={groups_filter}
            many_users={many_users}
            many_groups={many_groups}
            allUsers={users}
          />
        </div>
      ) : null}
    </Container>
  );
};

export default compose(injectLazyLibs(['reactSelect']))(
  UserGroupMembershipMatrix,
);
