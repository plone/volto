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
  MenuList,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import { FormFieldWrapper } from '@plone/volto/components';

const messages = defineMessages({
  select: {
    id: 'Select…',
    defaultMessage: 'Select…',
  },
  no_options: {
    id: 'No options',
    defaultMessage: 'No options',
  },
  type_text: {
    id: 'Type text...',
    defaultMessage: 'Type text...',
  },
});

/**
 * ArrayWidget component class.
 * @class ArrayWidget
 * @extends Component
 */
class SelectAutoComplete extends Component {
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
      selectedOption: props.value
        ? props.value.map((item) =>
            isObject(item)
              ? { label: item.title || item.token, value: item.token }
              : { label: item, value: item },
          )
        : [],
      searchLength: 0,
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

  timeoutRef = React.createRef();

  // How many characters to hold off searching from. Search tarts at this plus one.
  SEARCH_HOLDOFF = 2;

  loadOptions = (query) => {
    // Implement a debounce of 400ms and a min search of 3 chars
    if (query.length > this.SEARCH_HOLDOFF) {
      if (this.timeoutRef.current) clearTimeout(this.timeoutRef.current);
      return new Promise((resolve) => {
        this.timeoutRef.current = setTimeout(async () => {
          resolve(
            await this.props
              .getVocabulary({
                vocabNameOrURL: this.props.vocabBaseUrl,
                query,
                size: -1,
                subrequest: this.props.intl.locale,
              })
              .then((resp) => {
                return resp.items.map((item) => ({
                  label: item.title,
                  value: item.token,
                }));
              }),
          );
        }, 400);
      });
    } else {
      return Promise.resolve([]);
    }
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { selectedOption } = this.state;
    const SelectAsync = this.props.reactSelectAsync.default;

    return (
      <FormFieldWrapper {...this.props}>
        <SelectAsync
          id={`field-${this.props.id}`}
          key={this.props.id}
          isDisabled={this.props.isDisabled}
          className="react-select-container"
          classNamePrefix="react-select"
          cacheOptions
          defaultOptions={[]}
          loadOptions={this.loadOptions}
          onInputChange={(search) =>
            this.setState({ searchLength: search.length })
          }
          noOptionsMessage={() =>
            this.props.intl.formatMessage(
              this.state.searchLength > this.SEARCH_HOLDOFF
                ? messages.no_options
                : messages.type_text,
            )
          }
          styles={customSelectStyles}
          theme={selectTheme}
          components={{
            ...(this.props.choices?.length > 25 && {
              MenuList,
            }),
            DropdownIndicator,
            Option,
          }}
          value={selectedOption || []}
          placeholder={this.props.intl.formatMessage(messages.select)}
          onChange={this.handleChange}
          isMulti
        />
      </FormFieldWrapper>
    );
  }
}

export const SelectAutoCompleteComponent = injectIntl(SelectAutoComplete);

export default compose(
  injectIntl,
  injectLazyLibs(['reactSelectAsync']),
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
)(SelectAutoComplete);
