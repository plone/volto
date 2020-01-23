/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Grid, Label } from 'semantic-ui-react';
import { isObject, map } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AsyncPaginate from 'react-select-async-paginate';
import CreatableSelect from 'react-select/creatable';

import {
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
} from '@plone/volto/helpers';
import { getVocabulary } from '@plone/volto/actions';

import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from './SelectStyling';

const messages = defineMessages({
  no_value: {
    id: 'No value',
    defaultMessage: 'No value',
  },
});

/**
 * ArrayWidget component class.
 * @class ArrayWidget
 * @extends Component
 */
class ArrayWidget extends Component {
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
      vocabulary: PropTypes.object,
    }),
    widgetOptions: PropTypes.shape({
      vocabulary: PropTypes.object,
    }),
    value: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    ),
    onChange: PropTypes.func.isRequired,
    itemsTotal: PropTypes.number,
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
    this.search = this.search.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.vocabBaseUrl =
      getVocabFromHint(props) ||
      getVocabFromField(props) ||
      getVocabFromItems(props);
    this.state = {
      search: '',
      selectedOption: props.value
        ? props.value.map(item =>
            isObject(item)
              ? { label: item.title, value: item.token }
              : { label: item, value: item },
          )
        : [],
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.vocabBaseUrl) {
      this.props.getVocabulary(this.vocabBaseUrl);
    }
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
   * Initiate search with new query
   * @method loadOptions
   * @param {string} search Search query.
   * @param {string} previousOptions The previous options rendered.
   * @param {string} additional Additional arguments to pass to the next loadOptions.
   * @returns {undefined}
   */
  loadOptions(search, previousOptions, additional) {
    const offset = this.state.search !== search ? 0 : additional.offset;
    this.props.getVocabulary(this.vocabBaseUrl, search, offset);
    this.setState({ search });
    return {
      options: this.props.choices,
      hasMore: this.props.itemsTotal > 25,
      additional: {
        offset: offset === additional.offset ? offset + 25 : offset,
      },
    };
  }

  /**
   * Handle the field change, store it in the local state and back to simple
   * array of tokens for correct serialization
   * @method handleChange
   * @param {array} selectedOption The selected options (already aggregated).
   * @returns {undefined}
   */
  handleChange(selectedOption) {
    this.setState({ selectedOption });

    this.props.onChange(
      this.props.id,
      selectedOption ? selectedOption.map(item => item.value) : null,
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { id, title, required, description, error, fieldSet } = this.props;
    const { selectedOption } = this.state;
    return (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={description ? 'help' : ''}
        id={`${fieldSet || 'field'}-${id}`}
      >
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor={`field-${id}`}>{title}</label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              {this.vocabBaseUrl ? (
                <AsyncPaginate
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={this.props.choices || []}
                  styles={customSelectStyles}
                  theme={selectTheme}
                  components={{ DropdownIndicator, Option }}
                  isMulti
                  value={selectedOption || []}
                  loadOptions={this.loadOptions}
                  onChange={this.handleChange}
                  additional={{
                    offset: 25,
                  }}
                />
              ) : (
                <CreatableSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={
                    this.props.choices
                      ? [
                          ...this.props.choices.map(option => ({
                            value: option[0],
                            label: option[1],
                          })),
                          {
                            label: this.props.intl.formatMessage(
                              messages.no_value,
                            ),
                            value: 'no-value',
                          },
                        ]
                      : []
                  }
                  styles={customSelectStyles}
                  theme={selectTheme}
                  components={{ DropdownIndicator, Option }}
                  value={selectedOption || []}
                  onChange={this.handleChange}
                  isMulti
                />
              )}
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

export default compose(
  injectIntl,
  connect(
    (state, props) => {
      const vocabBaseUrl =
        getVocabFromHint(props) ||
        getVocabFromField(props) ||
        getVocabFromItems(props);
      const vocabState = state.vocabularies[vocabBaseUrl];
      if (vocabState) {
        return {
          choices: vocabState.items,
          itemsTotal: vocabState.itemsTotal,
          loading: Boolean(vocabState.loading),
        };
      }
      return {};
    },
    { getVocabulary },
  ),
)(ArrayWidget);
