import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { Icon } from '@plone/volto/components';
import loupeSVG from '@plone/volto/icons/zoom.svg';

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
      {isLive && (
        <Button basic icon className="search-input-live-icon-button">
          <Icon name={loupeSVG} />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
