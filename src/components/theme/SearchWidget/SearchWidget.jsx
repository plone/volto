/**
 * Search widget component.
 * @module components/theme/SearchWidget/SearchWidget
 */

import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { PropTypes } from 'prop-types';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

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

@injectIntl
/**
 * SearchWidget component class.
 * @class SearchWidget
 * @extends Component
 */
export default class SearchWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onChangeSection = this.onChangeSection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      text: '',
      section: false,
    };
  }

  /**
   * On change text
   * @method onChangeText
   * @param {object} event Event object.
   * @param {string} value Text value.
   * @returns {undefined}
   */
  onChangeText(event, { value }) {
    this.setState({
      text: value,
    });
  }

  /**
   * On change section
   * @method onChangeSection
   * @param {object} event Event object.
   * @param {bool} checked Section checked.
   * @returns {undefined}
   */
  onChangeSection(event, { checked }) {
    this.setState({
      section: checked,
    });
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {event} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    const section = this.state.section ? `&path=${this.props.pathname}` : '';
    Router.push(`/search?SearchableText=${this.state.text}${section}`);
    event.preventDefault();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Form action="/search" onSubmit={this.onSubmit}>
        <Form.Field className="searchbox">
          <Input
            onChange={this.onChangeText}
            name="SearchableText"
            value={this.state.text}
            action={{ icon: 'search' }}
            transparent
            placeholder={this.props.intl.formatMessage(messages.searchSite)}
            title={this.props.intl.formatMessage(messages.search)}
          />
        </Form.Field>
      </Form>
    );
  }
}
