import React from 'react';
import { Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const SearchInput = (props) => {
  const { data, searchText, setSearchText, isLive, onTriggerSearch } = props;
  const intl = useIntl();

  return (
    <div className="search-input">
      <Input
        id={`${props.id}-searchtext`}
        value={searchText}
        placeholder={
          data.searchInputPrompt || intl.formatMessage(messages.search)
        }
        fluid
        onKeyPress={(event) => {
          if (isLive || event.key === 'Enter') onTriggerSearch(searchText);
        }}
        onChange={(event, { value }) => {
          setSearchText(value);
          if (isLive) {
            onTriggerSearch(value);
          }
        }}
      />
    </div>
  );
};

export default SearchInput;
