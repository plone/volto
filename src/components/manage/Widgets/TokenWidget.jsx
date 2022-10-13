/**
 * TokenWidget component.
 * @module components/manage/Widgets/TokenWidget
 */

import React from 'react';
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
 * TokenWidget component.
 *
 * Because new terms are created through the web by using the widget, the token
 * widget conflates the meaning of token, label and value and assumes they can
 * be used interchangeably.
 */
function TokenWidget(props) {
  const {
    id,
    description,
    required = false,
    items,
    widgetOptions,
    error = [],
    choices = [],
    value,
    getVocabulary,
    isDisabled,
    placeholder,
    intl,
    vocabLoading,
    vocabLoaded,
    vocabBaseUrl,
    lang,
    onChange,
    reactSelectCreateable,
  } = props;

  React.useEffect(() => {
    if (!choices?.length) {
      getVocabulary({
        vocabNameOrURL: vocabBaseUrl,
        size: -1,
        subrequest: lang,
      });
    }
  }, [choices.length, getVocabulary, lang, vocabBaseUrl]);

  React.useEffect(() => {
    if (!choices?.length && vocabLoading === undefined && !vocabLoaded) {
      getVocabulary({
        vocabNameOrURL: vocabBaseUrl,
        size: -1,
        subrequest: lang,
      });
    }
  }, [
    choices.length,
    getVocabulary,
    lang,
    vocabBaseUrl,
    vocabLoaded,
    vocabLoading,
  ]);

  /**
   * Handle the field change, store it in the local state and back to simple
   * array of tokens for correct serialization
   * @function handleChange
   * @param {array} selectedOption The selected options (already aggregated).
   * @returns {undefined}
   */
  function handleChange(selectedOption) {
    onChange(
      id,
      selectedOption ? selectedOption.map((item) => item.label) : null,
    );
  }

  const selectedOption = value
    ? value.map((item) => ({ label: item, value: item }))
    : [];

  const defaultOptions = (choices || [])
    .filter((item) => !selectedOption.find(({ label }) => label === item.label))
    .map((item) => ({
      label: item.label || item.value,
      value: item.value,
    }));
  const CreatableSelect = reactSelectCreateable.default;

  return (
    <FormFieldWrapper {...props}>
      <CreatableSelect
        id={`field-${id}`}
        key={id}
        isDisabled={isDisabled}
        className="react-select-container"
        classNamePrefix="react-select"
        defaultOptions={defaultOptions}
        options={defaultOptions}
        styles={customSelectStyles}
        theme={selectTheme}
        components={{ ClearIndicator, DropdownIndicator, Option }}
        isMulti
        value={selectedOption || []}
        onChange={handleChange}
        placeholder={placeholder ?? intl.formatMessage(messages.select)}
        noOptionsMessage={() => intl.formatMessage(messages.no_options)}
      />
    </FormFieldWrapper>
  );
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 */
TokenWidget.propTypes = {
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
  isDisabled: PropTypes.bool,
  // TODO: vocabBaseUrl proptypes
  // TODO: lang proptypes
};

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
