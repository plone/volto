import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

import { Icon } from '@plone/volto/components';
import zoomSVG from '@plone/volto/icons/zoom.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchSite: {
    id: 'Search Site',
    defaultMessage: 'Search Site',
  },
});

const SearchWidget = (props) => {
  const intl = useIntl();
  const [text, setText] = useState('');
  const history = useHistory();
  const onChangeText = (event, { value }) => {
    setText(value);
  };
  const pathname = props.pathname;
  const onSubmit = (event) => {
    const path =
      pathname?.length > 0 ? `&path=${encodeURIComponent(pathname)}` : '';

    history.push(`/search?SearchableText=${encodeURIComponent(text)}${path}`);
    // reset input value
    setText('');
    event.preventDefault();
  };

  return (
    <Form action="/search" onSubmit={onSubmit}>
      <Form.Field className="searchbox">
        <Input
          aria-label={intl.formatMessage(messages.search)}
          onChange={onChangeText}
          name="SearchableText"
          value={text}
          transparent
          autoComplete="off"
          placeholder={intl.formatMessage(messages.searchSite)}
          title={intl.formatMessage(messages.search)}
        />
        <button aria-label={intl.formatMessage(messages.search)}>
          <Icon name={zoomSVG} size="18px" />
        </button>
      </Form.Field>
    </Form>
  );
};

export default SearchWidget;
