import React from 'react';
import { FormattedMessage } from 'react-intl';

const DefaultNoResultsComponent = (props) => {
  return (
    <FormattedMessage
      id="No results found."
      defaultMessage="No results found."
    />
  );
};

export default DefaultNoResultsComponent;
