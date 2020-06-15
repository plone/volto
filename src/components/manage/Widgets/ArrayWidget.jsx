/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import loadable from '@loadable/component';
import { getVocabulary } from '@plone/volto/actions';
import { customSelectStyles, DropdownIndicator, Option, selectTheme } from '@plone/volto/components/manage/Widgets/SelectStyling';
import { getVocabFromField, getVocabFromHint, getVocabFromItems } from '@plone/volto/helpers';
import { isObject, map } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Grid, Icon as IconOld, Label } from 'semantic-ui-react';

const AsyncPaginate = loadable(() => import('react-select-async-paginate'));
const CreatableSelect = loadable(() => import('react-select/creatable'));

const messages = defineMessages({
  select: {
    id: 'Select…',
    defaultMessage: 'Select…',
  },
  no_value: {
    id: 'No value',
    defaultMessage: 'No value',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  idTitle: {
    id: 'Short Name',
    defaultMessage: 'Short Name',
  },
  idDescription: {
    id: 'Used for programmatic access to the fieldset.',
    defaultMessage: 'Used for programmatic access to the fieldset.',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  close: {
    id: 'Close',
    defaultMessage: 'Close',
  },
  choices: {
    id: 'Choices',
    defaultMessage: 'Choices',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
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
    choices: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    ),
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
    onEdit: PropTypes.func,
    isDraggable: PropTypes.bool,
    isDissabled: PropTypes.bool,
    itemsTotal: PropTypes.number,
    onDelete: PropTypes.func,
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
    onEdit: null,
    onDelete: null,
    isDraggable: false,
    isDissabled: false,
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
        ? props.value.map((item) =>
            isObject(item)
              ? { label: item.title || item.token, value: item.token }
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
    if (!this.props.items?.choices && this.vocabBaseUrl) {
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
      selectedOption ? selectedOption.map((item) => item.value) : null,
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const schema = {
      fieldsets: [
        {
          id: 'default',
          title: this.props.intl.formatMessage(messages.default),
          fields: ['title', 'id', 'description', 'choices', 'required'],
        },
      ],
      properties: {
        id: {
          type: 'string',
          title: this.props.intl.formatMessage(messages.idTitle),
          description: this.props.intl.formatMessage(messages.idDescription),
        },
        title: {
          type: 'string',
          title: this.props.intl.formatMessage(messages.title),
        },
        description: {
          type: 'string',
          widget: 'textarea',
          title: this.props.intl.formatMessage(messages.description),
        },
        choices: {
          type: 'array',
          title: this.props.intl.formatMessage(messages.choices),
        },
        required: {
          type: 'boolean',
          title: this.props.intl.formatMessage(messages.required),
        },
      },
      required: ['id', 'title', 'choices'],
    };
    const {
      id,
      title,
      required,
      description,
      error,
      fieldSet,
      onDelete,
      onEdit,
      isDraggable,
      isDissabled,
    } = this.props;
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
                <label htmlFor={`field-${id}`}>
                  {isDraggable && (
                    <i
                      aria-hidden="true"
                      className="grey bars icon drag handle"
                    />
                  )}
                  {title}
                </label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              {onEdit && !isDissabled && (
                <div className="toolbar">
                  <button
                    onClick={() => onEdit(id, schema)}
                    className="item ui noborder button"
                  >
                    <IconOld name="write square" size="large" color="blue" />
                  </button>
                  <button
                    aria-label={this.props.intl.formatMessage(messages.close)}
                    className="item ui noborder button"
                    onClick={() => onDelete(id)}
                  >
                    <IconOld name="close" size="large" color="red" />
                  </button>
                </div>
              )}
              {!this.props.items?.choices && this.vocabBaseUrl ? (
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
                          ...this.props.choices.map((option) => ({
                            value: option[0],
                            label:
                              // Fix "None" on the serializer, to remove when fixed in p.restapi
                              option[1] !== 'None' && option[1]
                                ? option[1]
                                : option[0],
                          })),
                          {
                            label: this.props.intl.formatMessage(
                              messages.no_value,
                            ),
                            value: 'no-value',
                          },
                        ]
                      : [
                          {
                            label: this.props.intl.formatMessage(
                              messages.no_value,
                            ),
                            value: 'no-value',
                          },
                        ]
                  }
                  styles={customSelectStyles}
                  theme={selectTheme}
                  components={{ DropdownIndicator, Option }}
                  value={selectedOption || []}
                  placeholder={this.props.intl.formatMessage(messages.select)}
                  onChange={this.handleChange}
                  isMulti
                />
              )}
              {map(error, (message) => (
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
      // If the schema already has the choices in it, then do not try to get the vocab,
      // even if there is one
      if (props.items?.choices) {
        return {
          choices: props.items.choices,
        };
      } else if (vocabState) {
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
