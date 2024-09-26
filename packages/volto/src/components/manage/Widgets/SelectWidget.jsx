import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'redux';
import { map } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';
import {
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
} from '@plone/volto/helpers';
import { FormFieldWrapper } from '@plone/volto/components';
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
  const { value, onChange, id, isDisabled } = props;
  let { choices } = props;
  const intl = useIntl();
  const dispatch = useDispatch();

  const vocabBaseUrl = !choices
    ? getVocabFromHint(props) ||
      getVocabFromField(props) ||
      getVocabFromItems(props)
    : '';

  const vocabState = useSelector(
    (state) =>
      state.vocabularies?.[vocabBaseUrl]?.subrequests?.[state.intl.locale],
  );
  const lang = useSelector((state) => state.intl.locale);

  if (vocabState) {
    choices = vocabState?.items ?? [];
  }

  useEffect(() => {
    if ((!choices || choices?.length === 0) && vocabBaseUrl) {
      dispatch(
        getVocabulary({
          vocabNameOrURL: vocabBaseUrl,
          size: -1,
          subrequest: lang,
        }),
      );
    }
  }, [choices, vocabBaseUrl, lang, dispatch]);

  const normalizedValue = normalizeValue(choices, value, intl);
  // Make sure that both disabled and isDisabled (from the DX layout feat work)
  const disabled = props.disabled || isDisabled;
  const Select = props.reactSelect.default;

  let options = vocabBaseUrl
    ? choices
    : [
        ...map(choices, (option) => ({
          value: option[0],
          label:
            // Fix "None" on the serializer, to remove when fixed in p.restapi
            option[1] !== 'None' && option[1] ? option[1] : option[0],
        })),
        // Only set "no-value" option if there's no default in the field
        // TODO: also if this.props.defaultValue?
        ...(props.noValueOption && !props.default
          ? [
              {
                label: intl.formatMessage(messages.no_value),
                value: 'no-value',
              },
            ]
          : []),
      ];

  const isMulti = props.isMulti
    ? props.isMulti
    : id === 'roles' || id === 'groups' || props.type === 'array';

  return (
    <FormFieldWrapper {...props}>
      <Select
        id={`field-${id}`}
        key={choices}
        name={id}
        menuShouldScrollIntoView={false}
        isDisabled={disabled}
        isSearchable={true}
        className="react-select-container"
        classNamePrefix="react-select"
        isMulti={isMulti}
        options={options}
        styles={customSelectStyles}
        theme={selectTheme}
        components={{
          ...(options?.length > 25 && {
            MenuList,
          }),
          MultiValueContainer,
          DropdownIndicator,
          ClearIndicator,
          Option: props.customOptionStyling || Option,
        }}
        value={normalizedValue}
        placeholder={props.placeholder ?? intl.formatMessage(messages.select)}
        onChange={(selectedOption) => {
          if (isMulti) {
            return onChange(
              id,
              selectedOption.map((el) => el.value),
            );
          }
          return onChange(
            id,
            selectedOption && selectedOption.value !== 'no-value'
              ? selectedOption.value
              : undefined,
          );
        }}
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
  choices: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ),
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
    PropTypes.func,
    PropTypes.array,
  ]),
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  wrapped: PropTypes.bool,
  noValueOption: PropTypes.bool,
  customOptionStyling: PropTypes.any,
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
};

SelectWidget.defaultProps = {
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
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
  onEdit: null,
  onDelete: null,
  noValueOption: true,
  customOptionStyling: null,
};

export const SelectWidgetComponent = SelectWidget;

export default compose(injectLazyLibs(['reactSelect']))(SelectWidgetComponent);
