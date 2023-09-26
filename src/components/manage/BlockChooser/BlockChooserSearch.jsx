import React, { useRef } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

const BlockChooserSearch = ({ onChange, searchValue }) => {
  const intl = useIntl();
  const searchInput = useRef(null);

  return (
    <Form style={{ padding: '0.5em' }}>
      <Form.Field
        className="searchbox"
        style={{ borderLeft: 0, height: '2em', padding: 0 }}
      >
        {/* eslint-disable jsx-a11y/no-autofocus */}
        <Input
          aria-label={intl.formatMessage(messages.search)}
          onChange={(event) => onChange(event.target.value)}
          name="SearchableText"
          value={searchValue}
          transparent
          autoComplete="off"
          placeholder={intl.formatMessage(messages.search)}
          title={intl.formatMessage(messages.search)}
          ref={searchInput}
        />
        {searchValue && (
          <Button
            className="clear-search-button"
            aria-label={intl.formatMessage(messages.search)}
            onClick={() => {
              onChange('');
              searchInput.current.focus();
            }}
          >
            <Icon name={clearSVG} size="18px" />
          </Button>
        )}
      </Form.Field>
    </Form>
  );
};

export default BlockChooserSearch;
