/**
 * SelectAutoComplete component.
 * @module components/manage/Widgets/SelectAutoComplete
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  normalizeValue,
  normalizeChoices,
  convertValueToVocabQuery,
} from './SelectUtils';

import {
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
} from '@plone/volto/helpers';
import { getVocabulary, getVocabularyTokenTitle } from '@plone/volto/actions';

import {
  Option,
  ClearIndicator,
  DropdownIndicator,
  MultiValueContainer,
  selectTheme,
  customSelectStyles,
  MenuList,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

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
 * SelectAutoComplete component function.
 * @function SelectAutoComplete
 * @param {Object} props Component properties
 * @returns {JSX.Element} Markup for the component.
 */
const SelectAutoComplete = (props) => {
  const {
    id,
    choices,
    value,
    onChange,
    getVocabulary,
    getVocabularyTokenTitle,
    vocabBaseUrl,
    lang,
    placeholder,
    disabled,
    isDisabled,
  } = props;

  const [searchLength, setSearchLength] = useState(0);
  const [termsPairsCache, setTermsPairsCache] = useState([]);
  const timeoutRef = useRef();
  const intl = useIntl();

  // How many characters to hold off searching from. Search starts at this plus one.
  const SEARCH_HOLDOFF = 2;

  useEffect(() => {
    if (value && value.length > 0) {
      const tokensQuery = convertValueToVocabQuery(
        normalizeValue(choices, value, intl),
      );

      getVocabularyTokenTitle({
        vocabNameOrURL: vocabBaseUrl,
        subrequest: `widget-${id}-${lang}`,
        ...tokensQuery,
      });
    }
  }, [value, choices, vocabBaseUrl, id, lang, intl, getVocabularyTokenTitle]);

  useEffect(() => {
    if (
      termsPairsCache.length === 0 &&
      value?.length > 0 &&
      choices?.length > 0
    ) {
      setTermsPairsCache((prevCache) => [...prevCache, ...choices]);
    }
  }, [value, choices, termsPairsCache.length]);

  const handleChange = useCallback(
    (selectedOption) => {
      onChange(
        id,
        selectedOption ? selectedOption.map((item) => item.value) : null,
      );
      setTermsPairsCache((prevCache) => [...prevCache, ...selectedOption]);
    },
    [onChange, id],
  );

  const fetchAvailableChoices = useCallback(
    async (query) => {
      const resp = await getVocabulary({
        vocabNameOrURL: vocabBaseUrl,
        query,
        size: -1,
        subrequest: lang,
      });

      return normalizeChoices(resp.items || [], intl);
    },
    [getVocabulary, vocabBaseUrl, lang, intl],
  );

  const loadOptions = useCallback(
    (query) => {
      // Implement a debounce of 400ms and a min search of 3 chars
      if (query.length > SEARCH_HOLDOFF) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        return new Promise((resolve) => {
          timeoutRef.current = setTimeout(async () => {
            const res = await fetchAvailableChoices(query);
            resolve(res);
          }, 400);
        });
      } else {
        return Promise.resolve([]);
      }
    },
    [fetchAvailableChoices],
  );

  const selectedOption = normalizeValue(termsPairsCache, value, intl);
  const SelectAsync = props.reactSelectAsync.default;

  return (
    <FormFieldWrapper {...props}>
      <SelectAsync
        id={`field-${id}`}
        key={id}
        isDisabled={disabled || isDisabled}
        className="react-select-container"
        classNamePrefix="react-select"
        cacheOptions
        defaultOptions={[]}
        loadOptions={loadOptions}
        onInputChange={(search) => setSearchLength(search.length)}
        noOptionsMessage={() =>
          intl.formatMessage(
            searchLength > SEARCH_HOLDOFF
              ? messages.no_options
              : messages.type_text,
          )
        }
        styles={customSelectStyles}
        theme={selectTheme}
        components={{
          ...(choices?.length > 25 && {
            MenuList,
          }),
          MultiValueContainer,
          ClearIndicator,
          DropdownIndicator,
          Option,
        }}
        value={selectedOption || []}
        placeholder={placeholder ?? intl.formatMessage(messages.select)}
        onChange={handleChange}
        isMulti
      />
    </FormFieldWrapper>
  );
};

SelectAutoComplete.propTypes = {
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
  isDisabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

SelectAutoComplete.defaultProps = {
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

export const SelectAutoCompleteComponent = SelectAutoComplete;

export default compose(
  injectLazyLibs(['reactSelectAsync']),
  connect(
    (state, props) => {
      const vocabBaseUrl =
        getVocabFromHint(props) ||
        getVocabFromField(props) ||
        getVocabFromItems(props);

      const vocabState =
        state.vocabularies?.[vocabBaseUrl]?.subrequests?.[
          `widget-${props.id}-${state.intl.locale}`
        ]?.items;

      // If the schema already has the choices in it, then do not try to get
      // the vocab, even if there is one
      return props.items?.choices
        ? { choices: props.items.choices, lang: state.intl.locale }
        : vocabState
          ? {
              choices: vocabState,
              vocabBaseUrl,
              lang: state.intl.locale,
            }
          : { vocabBaseUrl, lang: state.intl.locale };
    },
    { getVocabulary, getVocabularyTokenTitle },
  ),
)(SelectAutoComplete);
