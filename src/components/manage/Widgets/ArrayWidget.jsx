/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { isObject } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

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
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import { FormFieldWrapper } from '@plone/volto/components';

const messages = defineMessages({
  select: {
    id: 'Select…',
    defaultMessage: 'Select…',
  },
  no_value: {
    id: 'No value',
    defaultMessage: 'No value',
  },
  no_options: {
    id: 'No options',
    defaultMessage: 'No options',
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
    wrapped: PropTypes.bool,
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

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      selectedOption: this.props.vocabBaseUrl
        ? []
        : props.value
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
    if (
      !this.props.items?.choices?.length &&
      !this.props.choices?.length &&
      this.props.vocabBaseUrl
    ) {
      this.props.getVocabulary(
        this.props.vocabBaseUrl,
        null,
        undefined,
        100000,
        this.props.intl.locale,
      );
    }
    this.setDefaultValues();
  }

  componentDidUpdate() {
    this.setDefaultValues();
  }

  setDefaultValues() {
    if (
      (this.state.selectedOption || []).length === 0 &&
      this.props.value &&
      this.props.choices?.length > 0 &&
      this.props.vocabBaseUrl
    ) {
      this.setState({
        selectedOption: this.props.choices.filter(
          (item) => this.props.value.indexOf(item.value) >= 0,
        ),
      });
    }
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
    const { selectedOption } = this.state;
    const CreatableSelect = this.props.reactSelectCreateable.default;

    return (
      <FormFieldWrapper {...this.props}>
        <CreatableSelect
          id={`field-${this.props.id}`}
          key={this.props.id}
          isDisabled={this.props.isDisabled}
          className="react-select-container"
          classNamePrefix="react-select"
          options={
            this.props.vocabBaseUrl
              ? this.props.choices
              : this.props.choices
              ? [
                  ...this.props.choices.map((option) => ({
                    value: option[0],
                    label:
                      // Fix "None" on the serializer, to remove when fixed in p.restapi
                      option[1] !== 'None' && option[1] ? option[1] : option[0],
                  })),
                  ...(this.props.noValueOption && !this.props.default
                    ? [
                        {
                          label: this.props.intl.formatMessage(
                            messages.no_value,
                          ),
                          value: 'no-value',
                        },
                      ]
                    : []),
                ]
              : [
                  {
                    label: this.props.intl.formatMessage(messages.no_value),
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
      </FormFieldWrapper>
    );
  }
}

export const ArrayWidgetComponent = injectIntl(ArrayWidget);

export default compose(
  injectIntl,
  injectLazyLibs(['reactSelectCreateable']),
  connect(
    (state, props) => {
      const vocabBaseUrl =
        getVocabFromHint(props) ||
        getVocabFromField(props) ||
        getVocabFromItems(props);

      const vocabState =
        state.vocabularies?.[vocabBaseUrl]?.subrequests?.[props.intl.locale];

      // If the schema already has the choices in it, then do not try to get the vocab,
      // even if there is one
      if (props.items?.choices) {
        return {
          choices: props.items.choices,
        };
      } else if (vocabState) {
        return {
          choices: vocabState.items,
          vocabBaseUrl,
        };
      }
      return { vocabBaseUrl };
    },
    { getVocabulary },
  ),
)(ArrayWidget);
