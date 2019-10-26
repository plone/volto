/**
 * SelectWidget component.
 * @module components/manage/Widgets/SelectWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon as IconOld, Form, Grid, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { map, find, isBoolean, isObject } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import Select, { components } from 'react-select';
import AsyncPaginate from 'react-select-async-paginate';

import {
  getBoolean,
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
} from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import { getVocabulary, getVocabularyTokenTitle } from '@plone/volto/actions';

import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import checkSVG from '@plone/volto/icons/check.svg';

const messages = defineMessages({
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
  choices: {
    id: 'Choices',
    defaultMessage: 'Choices',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
});

const Option = props => {
  return (
    <components.Option {...props}>
      <div>{props.label}</div>
      {props.isFocused && !props.isSelected && (
        <Icon name={checkSVG} size="24px" color="#b8c6c8" />
      )}
      {props.isSelected && <Icon name={checkSVG} size="24px" color="#007bc1" />}
    </components.Option>
  );
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <Icon name={upSVG} size="24px" color="#007bc1" />
      ) : (
        <Icon name={downSVG} size="24px" color="#007bc1" />
      )}
    </components.DropdownIndicator>
  );
};

const selectTheme = theme => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: 'hotpink',
    primary: '#b8c6c8',
  },
});

const customSelectStyles = {
  control: (styles, state) => ({
    ...styles,
    border: 'none',
    borderBottom: '1px solid #c7d5d8',
    boxShadow: 'none',
    borderBottomStyle: state.menuIsOpen ? 'dotted' : 'solid',
    height: '60px',
  }),
  menu: (styles, state) => ({
    ...styles,
    top: null,
    marginTop: 0,
    boxShadow: 'none',
    borderBottom: '1px solid #c7d5d8',
  }),
  indicatorSeparator: styles => ({
    ...styles,
    width: null,
  }),
  valueContainer: styles => ({
    ...styles,
    paddingLeft: 0,
  }),
  dropdownIndicator: styles => ({
    paddingRight: 0,
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: null,
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 12px',
    color: state.isSelected
      ? '#007bc1'
      : state.isFocused
      ? '#4a4a4a'
      : 'inherit',
    ':active': {
      backgroundColor: null,
    },
  }),
};

function getDefaultValues(choices, value) {
  if (!isObject(value) && isBoolean(value)) {
    // We have a boolean value, which means we need to provide a "No value"
    // option
    const label = find(choices, o => getBoolean(o[0]) === value);
    return label
      ? {
          label: label[1],
          value,
        }
      : {};
  }
  if (value === 'no-value') {
    return { label: 'No value', value: 'no-value' };
  }
  if (isObject(value)) {
    return { label: value.title, value: value.token };
  }
  if (value && choices.length > 0) {
    return { label: find(choices, o => o[0] === value)[1], value };
  } else {
    return {};
  }
}

/**
 * SelectWidget component class.
 * @function SelectWidget
 * @returns {string} Markup of the component.
 */
class SelectWidget extends Component {
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
    getVocabularyTokenTitle: PropTypes.func.isRequired,
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
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.bool,
    ]),
    onChange: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
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
    onEdit: null,
    onDelete: null,
  };

  state = {
    selectedOption: this.props.value
      ? { label: this.props.value.title, value: this.props.value.value }
      : {},
  };

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

  vocabBaseUrl =
    getVocabFromHint(this.props) ||
    getVocabFromField(this.props) ||
    getVocabFromItems(this.props);

  /**
   * Initiate search with new query
   * @method loadOptions
   * @param {string} search Search query.
   * @param {string} previousOptions The previous options rendered.
   * @param {string} additional Additional arguments to pass to the next loadOptions.
   * @returns {undefined}
   */
  loadOptions = (search, previousOptions, additional) => {
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
  };

  /**
   * Handle the field change, store it in the local state and back to simple
   * array of tokens for correct serialization
   * @method handleChange
   * @param {array} selectedOption The selected options (already aggregated).
   * @returns {undefined}
   */
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onChange(this.props.id, selectedOption.value);
  };

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
      required,
      error,
      description,
      onEdit,
      id,
      title,
      onDelete,
      choices,
      value,
      onChange,
      fieldSet,
    } = this.props;

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
                  {onEdit && (
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
              {onEdit && (
                <div className="toolbar">
                  <button
                    onClick={() => onEdit(id, schema)}
                    className="item ui noborder button"
                  >
                    <IconOld name="write square" size="large" color="blue" />
                  </button>
                  <button
                    aria-label="Close"
                    className="item ui noborder button"
                    onClick={() => onDelete(id)}
                  >
                    <IconOld name="close" size="large" color="red" />
                  </button>
                </div>
              )}
              {this.vocabBaseUrl ? (
                <AsyncPaginate
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={this.props.choices || []}
                  styles={customSelectStyles}
                  theme={selectTheme}
                  components={{ DropdownIndicator, Option }}
                  value={this.state.selectedOption}
                  loadOptions={this.loadOptions}
                  onChange={this.handleChange}
                  additional={{
                    offset: 25,
                  }}
                />
              ) : (
                <Select
                  id={`field-${id}`}
                  name={id}
                  disabled={onEdit !== null}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={[
                    ...choices.map(option => ({
                      value: option[0],
                      label: option[1],
                    })),
                    { label: 'No value', value: 'no-value' },
                  ]}
                  styles={customSelectStyles}
                  theme={selectTheme}
                  components={{ DropdownIndicator, Option }}
                  defaultValue={getDefaultValues(choices, value)}
                  onChange={data =>
                    onChange(
                      id,
                      data.value === 'no-value' ? undefined : data.value,
                    )
                  }
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
          vocabState,
          choices: vocabState.items,
          itemsTotal: vocabState.itemsTotal,
          loading: Boolean(vocabState.loading),
        };
      }
      return {};
    },
    { getVocabulary, getVocabularyTokenTitle },
  ),
)(SelectWidget);
