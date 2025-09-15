import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import loupeSVG from '@plone/volto/icons/zoom.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  cancel_search: {
    id: 'Cancel search',
    defaultMessage: 'Cancel search',
  },
});

const SearchInput = (props) => {
  const {
    data,
    searchText,
    setSearchText,
    isLive,
    onTriggerSearch,
    removeSearchQuery,
  } = props;
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

      <div className="search-input-actions">
        {searchText && (
          <Button
            type="button"
            basic
            icon
            className="search-input-clear-icon-button"
            onClick={() => {
              setSearchText('');
              removeSearchQuery();
            }}
            aria-label={intl.formatMessage(messages.cancel_search)}
          >
            <Icon name={clearSVG} />
          </Button>
        )}
        {isLive && (
          <>
            <div className="divider" />
            <Button
              basic
              icon
              className="search-input-live-icon-button"
              aria-label={`${intl.formatMessage(messages.search)} ${searchText}`}
            >
              <Icon name={loupeSVG} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchInput;
