// /**
//  * BlockChooserSearch component.
//  * @module components/theme/BlockChooserSearch/BlockChooserSearch
//  */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';

import { Icon } from '@plone/volto/components';
import clearSVG from '@plone/volto/icons/clear.svg';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
});

/**
 * BlockChooserSearch component class.
 * @class BlockChooserSearch
 * @extends Component
 */
class BlockChooserSearch extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string,
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
    // this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      text: '',
    };
    this.searchInput = React.createRef();
  }

  /**
   * On change text
   * @method onChangeText
   * @param {object} event Event object.
   * @param {string} value Text value.
   * @returns {undefined}
   */
  onChangeText(event, { value }) {
    this.setSearchValue(value);
  }

  setSearchValue(value) {
    this.props.onChange(value);
    this.setState({
      text: value,
    });
  }

  // /**
  //  * Submit handler
  //  * @method onSubmit
  //  * @param {event} event Event object.
  //  * @returns {undefined}
  //  */
  // onSubmit(event) {
  //   this.props.onChange(event);
  //   event.preventDefault();
  // }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      // onSubmit={this.onSubmit}
      <Form style={{ padding: '0.5em' }}>
        <Form.Field
          className="searchbox"
          style={{ borderLeft: 0, height: '2em', padding: 0 }}
        >
          {/* eslint-disable jsx-a11y/no-autofocus */}
          <Input
            aria-label={this.props.intl.formatMessage(messages.search)}
            onChange={this.onChangeText}
            name="SearchableText"
            value={this.state.text}
            transparent
            autoComplete="off"
            placeholder={this.props.intl.formatMessage(messages.search)}
            title={this.props.intl.formatMessage(messages.search)}
            autoFocus
            ref={this.searchInput}
          />
          {this.state.text && (
            <Button
              className="clear-search-button"
              aria-label={this.props.intl.formatMessage(messages.search)}
              onClick={() => {
                this.setSearchValue('');
                this.searchInput.current.focus();
              }}
            >
              <Icon name={clearSVG} size="18px" />
            </Button>
          )}
        </Form.Field>
      </Form>
    );
  }
}

export default compose(withRouter, injectIntl)(BlockChooserSearch);
