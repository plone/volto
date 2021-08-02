import React from 'react';
import { Input } from 'semantic-ui-react';

const SearchInput = (props) => {
  const { data, searchText, setSearchText, isLive, onTriggerSearch } = props;

  return (
    <div className="search-input">
      {data.searchInputPrompt && (
        <label className="search-block-prompt">{data.searchInputPrompt}</label>
      )}
      <Input
        id={`${props.id}-searchtext`}
        value={searchText}
        placeholder="Search..."
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
