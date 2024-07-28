/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { find, isObject } from 'lodash';

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
  MenuList,
  SortableMultiValue,
  SortableMultiValueLabel,
  MultiValueContainer,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

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

function arrayMove(array, from, to) {
  const slicedArray = array.slice();
  slicedArray.splice(
    to < 0 ? array.length + to : to,
    0,
    slicedArray.splice(from, 1)[0],
  );
  return slicedArray;
}

function normalizeArrayValue(choices, value) {
  if (!value || !Array.isArray(value)) return [];
  if (value.length === 0) return value;

  if (typeof value[0] === 'string') {
    // raw value like ['foo', 'bar']
    return value.map((v) => {
      return {
        label: find(choices, (c) => c.value === v)?.label || v,
        value: v,
      };
    });
  }

  if (
    isObject(value[0]) &&
    Object.keys(value[0]).includes('token') // Array of objects, w/ label+value
  ) {
    return value
      .map((v) => {
        const item = find(choices, (c) => c.value === v.token);
        return item
          ? {
              label: item.label || item.title || item.token,
              value: v.token,
            }
          : {
              // avoid a crash if choices doesn't include this item
              label: v.label,
              value: v.token,
            };
      })
      .filter((f) => !!f);
  }

  return [];
}

function normalizeChoices(choices) {
  if (Array.isArray(choices) && choices.length && Array.isArray(choices[0])) {
    return choices.map((option) => ({
      value: option[0],
      label:
        // Fix "None" on the serializer, to remove when fixed in p.restapi
        option[1] !== 'None' && option[1] ? option[1] : option[0],
    }));
  }

  return choices;
}

/**
 * Compare values and return true if equal.
 * Consider upper and lower case.
 * @method compareOption
 * @param {*} inputValue
 * @param {*} option
 * @param {*} accessors
 * @returns {boolean}
 */
const compareOption = (inputValue = '', option, accessors) => {
  const candidate = String(inputValue);
  const optionValue = String(accessors.getOptionValue(option));
  const optionLabel = String(accessors.getOptionLabel(option));
  return optionValue === candidate || optionLabel === candidate;
};

/**
 * ArrayWidget component.
 * @function ArrayWidget
 * @param {Object} props Component properties
 * @returns {JSX.Element} Markup for the component.
 *
 * A creatable select array widget will be rendered if the named vocabulary is
 * in the widget definition (hint) like:
 *
 * ```
 * list_field_voc_unconstrained = schema.List(
 *     title=u"List field with values from vocabulary but not constrained to them.",
 *     description=u"zope.schema.List",
 *     value_type=schema.TextLine(),
 *     required=False,
 *     missing_value=[],
 * )
 * directives.widget(
 *     "list_field_voc_unconstrained",
 *     AjaxSelectFieldWidget,
 *     vocabulary="plone.app.vocabularies.PortalTypes",
 * )
 * ```
 */

const ArrayWidget = (props) => {
  const {
    id,
    value,
    onChange,
    choices,
    items,
    vocabBaseUrl,
    vocabLoading,
    vocabLoaded,
    getVocabulary,
    disabled,
    isDisabled,
    focus,
    placeholder,
    default: defaultValue,
    noValueOption,
    reactSelectCreateable,
    reactSortableHOC,
    reactSelect,
    lang,
    creatable,
  } = props;

  const intl = useIntl();

  // Effect to fetch vocabulary if needed
  useEffect(() => {
    if (!items?.choices?.length && !choices?.length && vocabBaseUrl) {
      getVocabulary({
        vocabNameOrURL: vocabBaseUrl,
        size: -1,
        subrequest: lang,
      });
    }
  }, [items, choices, vocabBaseUrl, lang, getVocabulary]);

  useEffect(() => {
    if (
      !items?.choices?.length &&
      !choices?.length &&
      vocabLoading === undefined &&
      !vocabLoaded &&
      vocabBaseUrl
    ) {
      getVocabulary({
        vocabNameOrURL: vocabBaseUrl,
        size: -1,
        subrequest: lang,
      });
    }
  }, [
    items,
    choices,
    vocabLoading,
    vocabLoaded,
    vocabBaseUrl,
    lang,
    getVocabulary,
  ]);

  /**
   * Handle the field change, store it in the local state and back to simple
   * array of tokens for correct serialization
   * @function handleChange
   * @param {array} selectedOption The selected options (already aggregated).
   */
  const handleChange = (selectedOption) => {
    onChange(
      id,
      selectedOption ? selectedOption.map((item) => item.value) : null,
    );
  };

  /**
   * Handle sorting of selected options
   * @function onSortEnd
   * @param {array} selectedOption Current selected options
   * @param {Object} sortProps Properties from react-sortable-hoc
   */

  const onSortEnd = (selectedOption, { oldIndex, newIndex }) => {
    const newValue = arrayMove(selectedOption, oldIndex, newIndex);
    handleChange(newValue);
  };

  // Prepare data for rendering
  const normalizedChoices = normalizeChoices(choices || []);
  const selectedOption = normalizeArrayValue(normalizedChoices, value);

  const CreatableSelect = reactSelectCreateable.default;
  const { SortableContainer } = reactSortableHOC;
  const Select = reactSelect.default;
  const SortableSelect =
    // It will be only creatable if the named vocabulary is in the widget definition
    // (hint) like:
    // list_field_voc_unconstrained = schema.List(
    //     title=u"List field with values from vocabulary but not constrained to them.",
    //     description=u"zope.schema.List",
    //     value_type=schema.TextLine(),
    //     required=False,
    //     missing_value=[],
    // )
    // directives.widget(
    //     "list_field_voc_unconstrained",
    //     AjaxSelectFieldWidget,
    //     vocabulary="plone.app.vocabularies.PortalTypes",
    // )
    choices && !getVocabFromHint({ items }) && !creatable
      ? SortableContainer(Select)
      : SortableContainer(CreatableSelect);

  return (
    <FormFieldWrapper {...props}>
      <SortableSelect
        useDragHandle
        // react-sortable-hoc props:
        axis="xy"
        onSortEnd={(sortProp) => {
          onSortEnd(selectedOption, sortProp);
        }}
        menuShouldScrollIntoView={false}
        distance={4}
        // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
        getHelperDimensions={({ node }) => node.getBoundingClientRect()}
        id={`field-${id}`}
        key={id}
        isDisabled={disabled || isDisabled}
        className="react-select-container"
        classNamePrefix="react-select"
        /* eslint-disable jsx-a11y/no-autofocus */
        autoFocus={focus}
        /* eslint-enable jsx-a11y/no-autofocus */
        options={
          vocabBaseUrl
            ? normalizedChoices
            : choices
              ? [
                  ...normalizedChoices,
                  ...(noValueOption &&
                  (defaultValue === undefined || defaultValue === null)
                    ? [
                        {
                          label: intl.formatMessage(messages.no_value),
                          value: 'no-value',
                        },
                      ]
                    : []),
                ]
              : [
                  {
                    label: intl.formatMessage(messages.no_value),
                    value: 'no-value',
                  },
                ]
        }
        styles={customSelectStyles}
        theme={selectTheme}
        components={{
          ...(choices?.length > 25 && {
            MenuList,
          }),
          MultiValueContainer,
          MultiValue: SortableMultiValue,
          MultiValueLabel: SortableMultiValueLabel,
          DropdownIndicator,
          ClearIndicator,
          Option,
        }}
        value={selectedOption || []}
        placeholder={placeholder ?? intl.formatMessage(messages.select)}
        onChange={handleChange}
        isValidNewOption={(inputValue, selectValue, selectOptions, accessors) =>
          !(
            !inputValue ||
            selectValue.some((option) =>
              compareOption(inputValue, option, accessors),
            ) ||
            selectOptions.some((option) =>
              compareOption(inputValue, option, accessors),
            )
          )
        }
        isClearable
        isMulti
      />
    </FormFieldWrapper>
  );
};

ArrayWidget.propTypes = {
  id: PropTypes.string.isRequired,
  getVocabulary: PropTypes.func.isRequired,
  choices: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  ),
  vocabLoading: PropTypes.bool,
  vocabLoaded: PropTypes.bool,
  items: PropTypes.shape({
    vocabulary: PropTypes.object,
  }),
  widgetOptions: PropTypes.shape({
    vocabulary: PropTypes.object,
  }),
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  ),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  wrapped: PropTypes.bool,
  creatable: PropTypes.bool, //if widget has no vocab and you want to be creatable
};

ArrayWidget.defaultProps = {
  items: {
    vocabulary: null,
  },
  widgetOptions: {
    vocabulary: null,
  },
  error: [],
  choices: [],
  value: null,
  creatable: false,
};

export const ArrayWidgetComponent = ArrayWidget;

export default connect(
  (state, props) => {
    const vocabBaseUrl =
      getVocabFromHint(props) ||
      getVocabFromField(props) ||
      getVocabFromItems(props);

    const vocabState =
      state.vocabularies?.[vocabBaseUrl]?.subrequests?.[state.intl.locale];

    // If the schema already has the choices in it, then do not try to get the vocab,
    // even if there is one
    if (props.items?.choices) {
      return {
        choices: props.items.choices,
        lang: state.intl.locale,
      };
    } else if (vocabState) {
      return {
        choices: vocabState.items,
        vocabBaseUrl,
        vocabLoading: vocabState.loading,
        vocabLoaded: vocabState.loaded,
        lang: state.intl.locale,
      };
    }
    return { vocabBaseUrl, lang: state.intl.locale };
  },
  { getVocabulary },
)(
  injectLazyLibs(['reactSelect', 'reactSelectCreateable', 'reactSortableHOC'])(
    ArrayWidget,
  ),
);
