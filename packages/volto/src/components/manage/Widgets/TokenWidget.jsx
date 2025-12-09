/**
 * TokenWidget component.
 * @module components/manage/Widgets/TokenWidget
 */

import React, { useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import {
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
} from '@plone/volto/helpers/Vocabularies/Vocabularies';
import { getVocabulary } from '@plone/volto/actions/vocabularies/vocabularies';

import {
  Option,
  DropdownIndicator,
  ClearIndicator,
  MultiValueContainer,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
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
 *
 * @param {Object} props Component properties
 * @returns {JSX.Element} Markup for the component.
 */
const TokenWidget = (props) => {
  const {
    id,
    value,
    onChange,
    placeholder,
    reactSelectCreateable,
    isDisabled,
    fieldSet,
    choices: propChoices,
    vocabLoading,
    vocabLoaded,
    vocabBaseUrl,
    lang,
    getVocabulary,
  } = props;

  const intl = useIntl();

  const choices = useMemo(() => propChoices || [], [propChoices]);

  useEffect(() => {
    if (
      !choices?.length &&
      vocabLoading === undefined &&
      !vocabLoaded &&
      vocabBaseUrl &&
      getVocabulary
    ) {
      getVocabulary({
        vocabNameOrURL: vocabBaseUrl,
        size: -1,
        subrequest: lang,
      });
    }
  }, [
    choices?.length,
    vocabLoading,
    vocabLoaded,
    vocabBaseUrl,
    lang,
    getVocabulary,
  ]);

  const handleChange = useCallback(
    (selectedOption) => {
      onChange(
        id,
        selectedOption ? selectedOption.map((item) => item.label) : null,
      );
    },
    [onChange, id],
  );

  const selectedOption = useMemo(
    () => (value ? value.map((item) => ({ label: item, value: item })) : []),
    [value],
  );

  const defaultOptions = useMemo(
    () =>
      (choices || [])
        .filter(
          (item) => !selectedOption.find(({ label }) => label === item.label),
        )
        .map((item) => ({
          label: item.label || item.value,
          value: item.value,
        })),
    [choices, selectedOption],
  );

  const CreatableSelect = reactSelectCreateable.default;

  return (
    <FormFieldWrapper {...props}>
      <CreatableSelect
        id={`field-${id}`}
        aria-labelledby={`fieldset-${fieldSet}-field-label-${id}`}
        key={id}
        menuShouldScrollIntoView={false}
        isDisabled={isDisabled}
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
        onChange={handleChange}
        placeholder={placeholder ?? intl.formatMessage(messages.select)}
        noOptionsMessage={() => intl.formatMessage(messages.no_options)}
      />
    </FormFieldWrapper>
  );
};

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
  vocabBaseUrl: PropTypes.string,
  lang: PropTypes.string,
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
  reactSelectCreateable: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool,
  fieldSet: PropTypes.string,
};

TokenWidget.defaultProps = {
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

export default compose(
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
