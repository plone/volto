/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
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
    items: PropTypes.shape({
      vocabulary: PropTypes.object,
    }),
    widgetOptions: PropTypes.shape({
      vocabulary: PropTypes.object,
    }),
    value: PropTypes.arrayOf(PropTypes.string),
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
      selectedOption: props.value
        ? props.value.map((item) => ({ label: item, value: item }))
        : [],
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getVocabulary(
      this.props.vocabBaseUrl,
      null,
      undefined,
      100000,
      this.props.intl.locale,
    );
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
      selectedOption ? selectedOption.map((item) => item.label) : null,
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { selectedOption } = this.state;
    const defaultOptions = (this.props.choices || [])
      .filter(
        (item) =>
          !this.state.selectedOption.find(({ label }) => label === item.label),
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
          isDisabled={this.props.isDisabled}
          className="react-select-container"
          classNamePrefix="react-select"
          defaultOptions={defaultOptions}
          options={defaultOptions}
          styles={customSelectStyles}
          theme={selectTheme}
          components={{ DropdownIndicator, Option }}
          isMulti
          value={selectedOption || []}
          onChange={this.handleChange}
          placeholder={this.props.intl.formatMessage(messages.select)}
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
        state.vocabularies?.[vocabBaseUrl]?.subrequests?.[props.intl.locale];

      if (vocabState) {
        return {
          choices: vocabState.items
            ? vocabState.items.map((item) => ({
                label: item.label || item.value,
                value: item.value,
              }))
            : [],
          vocabBaseUrl,
        };
      }
      return { vocabBaseUrl };
    },
    { getVocabulary },
  ),
)(TokenWidget);
