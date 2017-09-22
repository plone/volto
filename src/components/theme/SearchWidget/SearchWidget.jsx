/**
 * Search widget component.
 * @module components/theme/SearchWidget/SearchWidget
 */

import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Checkbox, Form, Input } from 'semantic-ui-react';
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
  section: {
    id: 'only in current section',
    defaultMessage: 'only in current section',
  },
});

/**
 * SearchWidget component class.
 * @class SearchWidget
 * @extends Component
 */
@injectIntl
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
   * 
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
   * 
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
   * 
   */
  onSubmit(event) {
    const section = this.state.section ? `&path=${this.props.pathname}` : '';
    browserHistory.push(`/search?SearchableText=${this.state.text}${section}`);
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
        <Form.Field>
          <Input
            onChange={this.onChangeText}
            name="SearchableText"
            value={this.state.text}
            action={this.props.intl.formatMessage(messages.search)}
            placeholder={this.props.intl.formatMessage(messages.searchSite)}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            onChange={this.onChangeSection}
            checked={this.state.section}
            label={this.props.intl.formatMessage(messages.section)}
          />
        </Form.Field>
      </Form>
    );
  }
}
