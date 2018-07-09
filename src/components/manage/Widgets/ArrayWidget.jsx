/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Label, Dropdown } from 'semantic-ui-react';
import { concat, debounce, map, uniqBy } from 'lodash';
import { connect } from 'react-redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { bindActionCreators } from 'redux';

import { getVocabulary } from '../../../actions';

const messages = defineMessages({
  no_results_found: {
    id: 'No results found.',
    defaultMessage: 'No results found.',
  },
});

@injectIntl
@connect(
  (state, props) => {
    const vocabBaseUrl =
      props.widgetOptions.vocabulary || props.items.vocabulary;
    const vocabState = state.vocabularies[vocabBaseUrl];
    if (vocabState) {
      return {
        choices: vocabState.items,
        loading: Boolean(vocabState.loading),
      };
    }
    return {};
  },
  dispatch => bindActionCreators({ getVocabulary }, dispatch),
)
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
    getVocabulary: PropTypes.func.isRequired,
    choices: PropTypes.arrayOf(PropTypes.object),
    loading: PropTypes.bool,
    items: PropTypes.shape({
      vocabulary: PropTypes.string,
    }),
    widgetOptions: PropTypes.shape({
      vocabulary: PropTypes.string,
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
      vocabulary: null,
    },
    widgetOptions: {
      vocabulary: null,
    },
    error: [],
    choices: [],
    loading: false,
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
    this.getOptions = this.getOptions.bind(this);
    this.search = this.search.bind(this);
    this.vocabBaseUrl =
      props.widgetOptions.vocabulary || props.items.vocabulary;
    props.getVocabulary(this.vocabBaseUrl);
    this.state = {
      choices: [],
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
   * Format options for semantic-ui Dropdown
   * @returns {Array} Options.
   */
  getOptions() {
    return uniqBy(
      concat(
        this.props.choices
          ? map(this.props.choices, choice => ({
              key: choice.token,
              text: choice.title,
              value: choice.token,
            }))
          : [],
        this.props.value
          ? map(this.props.value, value => ({
              key: value,
              text: value,
              value,
            }))
          : [],
      ),
      'key',
    );
  }

  /**
   * Initiate search with new query
   * @param {string} query Search query.
   * @returns {undefined}
   */
  search(query) {
    if (query.length > 1) {
      this.props.getVocabulary(this.vocabBaseUrl, query);
    }
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
      loading,
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
                options={this.getOptions()}
                loading={loading}
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
                onSearchChange={debounce(
                  (event, data) => this.search(data.searchQuery),
                  200,
                )}
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
