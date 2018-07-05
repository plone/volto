/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Label, Dropdown } from 'semantic-ui-react';
import { concat, map, uniqBy } from 'lodash';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  no_results_found: {
    id: 'No results found.',
    defaultMessage: 'No results found.',
  },
});

@injectIntl
/**
 * ArrayWidget component class.
 * @class ArrayWidget
 * @extends Component
 */
export default class ArrayWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    items: PropTypes.shape({
      choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    }),
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    items: {
      choices: [],
    },
    error: [],
    value: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Actions
   */
  constructor(props) {
    super(props);
    this.onAddItem = this.onAddItem.bind(this);
    this.state = {
      choices: uniqBy(
        concat(
          props.items.choices
            ? map(props.items.choices, choice => ({
                key: choice[0],
                text: choice[1],
                value: choice[0],
              }))
            : [],
          props.value
            ? map(props.value, value => ({
                key: value,
                text: value,
                value,
              }))
            : [],
        ),
        'key',
      ),
    };
  }

  /**
   * On add item handler
   * @method onAddItem
   * @param {Object} event Event object.
   * @param {string} value Value to add.
   * @returns {undefined}
   */
  onAddItem(event, { value }) {
    this.setState({
      choices: [{ text: value, value, id: value }, ...this.state.choices],
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      title,
      required,
      description,
      error,
      value,
      onChange,
    } = this.props;
    return (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={description ? 'help' : ''}
      >
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor={`field-${id}`}>{title}</label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <Dropdown
                options={this.state.choices}
                placeholder={title}
                search
                selection
                multiple
                fluid
                noResultsMessage={this.props.intl.formatMessage(
                  messages.no_results_found,
                )}
                allowAdditions
                value={value || []}
                onAddItem={this.onAddItem}
                onChange={(event, data) => onChange(id, data.value)}
              />
              {map(error, message => (
                <Label key={message} basic color="red" pointing>
                  {message}
                </Label>
              ))}
            </Grid.Column>
          </Grid.Row>
          {description && (
            <Grid.Row stretched>
              <Grid.Column stretched width="12">
                <p className="help">{description}</p>
              </Grid.Column>
            </Grid.Row>
          )}
        </Grid>
      </Form.Field>
    );
  }
}
