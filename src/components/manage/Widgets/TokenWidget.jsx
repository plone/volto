/**
 * TokenWidget component.
 * @module components/manage/Widgets/TokenWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import {
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
} from '@plone/volto/helpers';
import { getVocabulary } from '@plone/volto/actions';

import {
  Option,
  DropdownIndicator,
  ClearIndicator,
  MultiValueContainer,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import { FormFieldWrapper } from '@plone/volto/components';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

const messages = defineMessages({
  select: {
    id: 'Select…',
    defaultMessage: 'Select…',
  },
  no_options: {
    id: 'No options',
    defaultMessage: 'No options',
  },
});

/**
 * TokenWidget component class.
 *
 * Because new terms are created through the web by using the widget, the token
 * widget conflates the meaning of token, label and value and assumes they can
 * be used interchangeably.
 *
 * @class TokenWidget
 * @extends Component
 */
class TokenWidget extends Component {
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
    vocabLoading: PropTypes.bool,
    vocabLoaded: PropTypes.bool,
    items: PropTypes.shape({
      vocabulary: PropTypes.object,
    }),
    widgetOptions: PropTypes.shape({
      vocabulary: PropTypes.object,
    }),
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    wrapped: PropTypes.bool,
    placeholder: PropTypes.string,
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
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (!this.props.choices?.length) {
      this.props.getVocabulary({
        vocabNameOrURL: this.props.vocabBaseUrl,
        size: -1,
        subrequest: this.props.lang,
      });
    }
  }

  componentDidUpdate() {
    if (
      !this.props.choices?.length &&
      this.props.vocabLoading === undefined &&
      !this.props.vocabLoaded
    ) {
      this.props.getVocabulary({
        vocabNameOrURL: this.props.vocabBaseUrl,
        size: -1,
        subrequest: this.props.lang,
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
    this.props.onChange(
      this.props.id,
      selectedOption ? selectedOption.map((item) => item.label) : null,
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const selectedOption = this.props.value
      ? this.props.value.map((item) => ({ label: item, value: item }))
      : [];

    const defaultOptions = (this.props.choices || [])
      .filter(
        (item) => !selectedOption.find(({ label }) => label === item.label),
      )
      .map((item) => ({
        label: item.label || item.value,
        value: item.value,
      }));
    const CreatableSelect = this.props.reactSelectCreateable.default;

    return (
      <FormFieldWrapper {...this.props}>
        <CreatableSelect
          id={`field-${this.props.id}`}
          key={this.props.id}
          menuShouldScrollIntoView={false}
          isDisabled={this.props.isDisabled}
          className="react-select-container"
          classNamePrefix="react-select"
          defaultOptions={defaultOptions}
          options={defaultOptions}
          styles={customSelectStyles}
          theme={selectTheme}
          components={{
            MultiValueContainer,
            ClearIndicator,
            DropdownIndicator,
            Option,
          }}
          isMulti
          value={selectedOption || []}
          onChange={this.handleChange}
          placeholder={
            this.props.placeholder ??
            this.props.intl.formatMessage(messages.select)
          }
          noOptionsMessage={() =>
            this.props.intl.formatMessage(messages.no_options)
          }
        />
      </FormFieldWrapper>
    );
  }
}

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
        state.vocabularies?.[vocabBaseUrl]?.subrequests?.[state.intl.locale];

      if (vocabState) {
        return {
          choices: vocabState.items
            ? vocabState.items.map((item) => ({
                label: item.label || item.value,
                value: item.value,
              }))
            : [],
          vocabLoading: vocabState.loading,
          vocabLoaded: vocabState.loaded,
          vocabBaseUrl,
          lang: state.intl.locale,
        };
      }
      return { vocabBaseUrl, lang: state.intl.locale };
    },
    { getVocabulary },
  ),
)(TokenWidget);
