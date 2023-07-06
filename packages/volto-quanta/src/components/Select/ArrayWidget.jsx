/**
 * ArrayWidget component.
 * @module components/manage/Widgets/ArrayWidget
 */

import React, { Component } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { compose } from 'redux';
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
  ClearIndicator,
  customSelectStyles,
  DropdownIndicator,
  MenuList,
  MultiValueRemove,
  Option,
  SelectContainer,
  selectTheme,
  SortableMultiValue,
  SortableMultiValueLabel,
} from './SelectStyling';

import FormFieldWrapper from '../FormFieldWrapper/FormFieldWrapper';

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
 * ArrayWidget component class.
 * @class ArrayWidget
 * @extends Component
 *
 * A createable select array widget will be rendered if the named vocabulary is
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
      this.props.getVocabulary({
        vocabNameOrURL: this.props.vocabBaseUrl,
        size: -1,
        subrequest: this.props.intl.locale,
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
      selectedOption ? selectedOption.map((item) => item.value) : null,
    );
  }

  onSortEnd = (selectedOption, { oldIndex, newIndex }) => {
    const newValue = arrayMove(selectedOption, oldIndex, newIndex);

    this.handleChange(newValue);
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { id, required } = this.props;
    const disabled = this.props.disabled || this.props.isDisabled;
    const choices = normalizeChoices(this.props?.choices || []);
    const selectedOption = normalizeArrayValue(choices, this.props.value);

    const CreatableSelect = this.props.reactSelectCreateable.default;
    const { SortableContainer } = this.props.reactSortableHOC;
    const Select = this.props.reactSelect.default;
    const SortableSelect =
      // It will be only createable if the named vocabulary is in the widget definition
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
      this.props?.choices &&
      !getVocabFromHint(this.props) &&
      !this.props.creatable
        ? SortableContainer(Select)
        : SortableContainer(CreatableSelect);

    return (
      <FormFieldWrapper {...this.props}>
        <SortableSelect
          // START react-sortable-hoc props
          useDragHandle
          axis="xy"
          onSortEnd={this.onSortEnd}
          distance={4}
          // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          // END react-sortable-hoc props
          aria-labelledby={`field-label-${id}`}
          aria-describedby={`field-hint-${id}`}
          className="q react-select-container"
          classNamePrefix="react-select"
          components={{
            ClearIndicator,
            DropdownIndicator,
            ...(this.props.choices?.length > 25 && {
              MenuList,
            }),
            MultiValue: SortableMultiValue,
            MultiValueLabel: SortableMultiValueLabel,
            MultiValueRemove,
            Option,
            SelectContainer,
          }}
          id={`field-${this.props.id}`}
          isClearable
          isDisabled={disabled}
          isMulti
          hasError={this.props.error || null}
          key={this.props.id}
          noOptionsMessage={() =>
            this.props.intl.formatMessage(messages.no_options)
          }
          options={
            this.props.vocabBaseUrl
              ? choices
              : this.props.choices
              ? [
                  ...choices,
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
          placeholder={this.props.intl.formatMessage(messages.select)}
          styles={customSelectStyles}
          theme={selectTheme}
          value={selectedOption || []}
          onChange={this.handleChange}
        />
        <input
          className="q input"
          tabIndex={-1}
          hidden
          autoComplete="off"
          required={required}
          placeholder="Dummy"
        />
      </FormFieldWrapper>
    );
  }
}

export const ArrayWidgetComponent = injectIntl(ArrayWidget);

export default compose(
  injectIntl,
  injectLazyLibs(['reactSelect', 'reactSelectCreateable', 'reactSortableHOC']),
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
