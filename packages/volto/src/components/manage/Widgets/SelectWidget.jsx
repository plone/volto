import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { map } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import {
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
} from '@plone/volto/helpers';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import { getVocabulary, getVocabularyTokenTitle } from '@plone/volto/actions';
import { normalizeValue } from '@plone/volto/components/manage/Widgets/SelectUtils';

import {
  customSelectStyles,
  DropdownIndicator,
  ClearIndicator,
  Option,
  selectTheme,
  MenuList,
  MultiValueContainer,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';

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

const SelectWidget = (props) => {
  const {
    id,
    title,
    required,
    description,
    error,
    value,
    onChange,
    onBlur,
    onClick,
    choices,
    isDisabled,
    getVocabulary,
    getVocabularyTokenTitle,
    vocabBaseUrl,
    reactSelect,
    noValueOption,
    placeholder,
    customOptionStyling,
    isMulti,
    type,
    lang,
    ...rest
  } = props;

  const intl = useIntl();
  const Select = reactSelect.default;

  useEffect(() => {
    if ((!choices || choices?.length === 0) && vocabBaseUrl) {
      getVocabulary({
        vocabNameOrURL: vocabBaseUrl,
        size: -1,
        subrequest: lang,
      });
    }
  }, [choices, vocabBaseUrl, getVocabulary, lang]);

  const normalizedValue = normalizeValue(choices, value, intl);

  let options = vocabBaseUrl
    ? choices
    : [
        ...map(choices, (option) => ({
          value: option[0],
          label: option[1] !== 'None' && option[1] ? option[1] : option[0],
        })),
        ...(noValueOption &&
        (props.default === undefined || props.default === null)
          ? [
              {
                label: intl.formatMessage(messages.no_value),
                value: 'no-value',
              },
            ]
          : []),
      ];

  const isMultiSelect = isMulti
    ? isMulti
    : id === 'roles' || id === 'groups' || type === 'array';

  return (
    <FormFieldWrapper
      id={id}
      title={title}
      required={required}
      description={description}
      error={error}
      {...rest}
    >
      <Select
        id={`field-${id}`}
        name={id}
        className="react-select-container"
        classNamePrefix="react-select"
        isDisabled={isDisabled}
        isMulti={isMultiSelect}
        options={options}
        styles={customSelectStyles}
        theme={selectTheme}
        components={{
          ...(options?.length > 25 && { MenuList }),
          MultiValueContainer,
          DropdownIndicator,
          ClearIndicator,
          Option: customOptionStyling || Option,
        }}
        value={normalizedValue}
        placeholder={placeholder ?? intl.formatMessage(messages.select)}
        onChange={(selectedOption) => {
          if (isMultiSelect) {
            onChange(
              id,
              selectedOption ? selectedOption.map((item) => item.value) : [],
            );
          } else {
            onChange(
              id,
              selectedOption && selectedOption.value !== 'no-value'
                ? selectedOption.value
                : undefined,
            );
          }
        }}
        onBlur={onBlur}
        onClick={onClick}
        isClearable
      />
    </FormFieldWrapper>
  );
};

SelectWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
  ]),
  choices: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  wrapped: PropTypes.bool,
  noValueOption: PropTypes.bool,
  isMulti: PropTypes.bool,
  type: PropTypes.string,
};

SelectWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  choices: [],
  noValueOption: true,
};

export default compose(
  injectLazyLibs(['reactSelect']),
  connect(
    (state, props) => {
      const vocabBaseUrl = !props.choices
        ? getVocabFromHint(props) ||
          getVocabFromField(props) ||
          getVocabFromItems(props)
        : '';

      const vocabState =
        state.vocabularies?.[vocabBaseUrl]?.subrequests?.[state.intl.locale];

      if (props.choices) {
        return {
          choices: props.choices,
          lang: state.intl.locale,
        };
      } else if (vocabState) {
        return {
          vocabBaseUrl,
          choices: vocabState?.items ?? [],
          lang: state.intl.locale,
        };
      } else if (vocabBaseUrl) {
        return {
          vocabBaseUrl,
          lang: state.intl.locale,
        };
      }
      return { lang: state.intl.locale };
    },
    { getVocabulary, getVocabularyTokenTitle },
  ),
)(SelectWidget);
