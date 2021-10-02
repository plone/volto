import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  searchResults: {
    id: 'Search results',
    defaultMessage: 'Search results',
  },
  searchedFor: {
    id: 'Searched for',
    defaultMessage: 'Searched for',
  },
});

const SearchDetails = ({ total, text, as = 'h4' }) => {
  const El = as;
  const intl = useIntl();
  return (
    <El className="search-details">
      {text ? `${intl.formatMessage(messages.searchedFor)}: ${text}. ` : ''}
      {intl.formatMessage(messages.searchResults)}: {total}
    </El>
  );
};

export default SearchDetails;
