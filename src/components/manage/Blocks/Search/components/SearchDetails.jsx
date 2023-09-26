import React from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  searchResults: {
    id: 'Search results',
    defaultMessage: 'Search results',
  },
});

const SearchDetails = ({ total, text, as = 'h4', data }) => {
  const El = as;
  const intl = useIntl();
  return (
    <El className="search-details">
      <>
        {text && (
          <>
            <FormattedMessage
              id="Searched for: <em>{searchedtext}</em>."
              defaultMessage="Searched for: <em>{searchedtext}</em>."
              values={{
                em: (...chunks) => <em>{chunks}</em>,
                searchedtext: text,
              }}
            />
          </>
        )}
        {data.showTotalResults && (
          <>
            {' '}
            {intl.formatMessage(messages.searchResults)}: {total}
          </>
        )}
      </>
    </El>
  );
};

export default SearchDetails;
