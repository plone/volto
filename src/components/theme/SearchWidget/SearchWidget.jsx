/**
 * Search widget component.
 * @module components/theme/SearchWidget/SearchWidget
 */

import React from 'react';
import { browserHistory } from 'react-router';
import { Checkbox, Form, Input } from 'semantic-ui-react';

/**
 * SearchWidget component class.
 * @function SearchWidget
 * @returns {string} Markup of the component.
 */
const SearchWidget = () => (
  <Form
    action="/search"
    onSubmit={(e) => {
      browserHistory.push(`/search?SearchableText=${document.getElementsByName('SearchableText')[0].value}`);
      e.preventDefault();
      return false;
    }}
  >
    <Form.Field>
      <Input name="SearchableText" action="Search" placeholder="Search Site" />
    </Form.Field>
    <Form.Field>
      <Checkbox label='only in current section' />
    </Form.Field>
  </Form>
);

export default SearchWidget;
