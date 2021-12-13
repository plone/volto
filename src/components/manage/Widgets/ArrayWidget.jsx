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
import { find, isObject, isArray } from 'lodash';

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
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import { FormFieldWrapper } from '@plone/volto/components';

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

/**
 * ArrayWidget component class.
 * @class ArrayWidget
 * @extends Component
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

    this.state = {
      selectedOption: this.props.vocabBaseUrl
        ? []
        : props.value
        ? props.value.map((item) =>
            isObject(item)
              ? { label: item.title || item.token, value: item.token }
              : { label: item, value: item },
          )
        : [],
    };
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
    this.setDefaultValues();
  }

  componentDidUpdate() {
    this.setDefaultValues();
  }

  normalizeArrayValue = (choices, value) => {
    // Array of tokens (on add, and on change tab in Tab component)
    if (
      value &&
      isArray(value) &&
      value.length > 0 &&
      typeof value[0] === 'string'
    ) {
      return value.map((v) => {
        return {
          label: find(choices, (c) => c.value === v)?.label || v,
          value: v,
        };
      });
    }
    // Array of objects, containing label,value
    if (
      value &&
      isArray(value) &&
      value.length > 0 &&
      isObject(value[0]) &&
      Object.keys(value[0]).includes('token')
    ) {
      return value.map((v) => {
        return {
          label: find(choices, (c) => c.value === v.token).label,
          value: v.token,
        };
      });
    }
    return null;
  };

  setDefaultValues = () => {
    if (
      (this.state.selectedOption || []).length === 0 &&
      this.props.value &&
      this.props.choices?.length > 0
    ) {
      const normalizedValue = this.normalizeArrayValue(
        this.props.choices,
        this.props.value,
      );
      if (normalizedValue !== null) {
        this.setState({
          selectedOption: normalizedValue,
        });
      }
    }
  };

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

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { selectedOption } = this.state;
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
      this.props?.choices && !getVocabFromHint(this.props)
        ? SortableContainer(Select)
        : SortableContainer(CreatableSelect);

    const onSortEnd = ({ oldIndex, newIndex }) => {
      const newValue = arrayMove(this.state.selectedOption, oldIndex, newIndex);

      this.setState({ selectedOption: newValue });
    };

    return (
      <FormFieldWrapper {...this.props}>
        <SortableSelect
          useDragHandle
          // react-sortable-hoc props:
          axis="xy"
          onSortEnd={onSortEnd}
          distance={4}
          // small fix for https://github.com/clauderic/react-sortable-hoc/pull/352:
          getHelperDimensions={({ node }) => node.getBoundingClientRect()}
          id={`field-${this.props.id}`}
          key={this.props.id}
          isDisabled={this.props.isDisabled}
          className="react-select-container"
          classNamePrefix="react-select"
          options={
            this.props.vocabBaseUrl
              ? this.props.choices
              : this.props.choices
              ? [
                  ...this.props.choices.map((option) => ({
                    value: option[0],
                    label:
                      // Fix "None" on the serializer, to remove when fixed in p.restapi
                      option[1] !== 'None' && option[1] ? option[1] : option[0],
                  })),
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
          styles={customSelectStyles}
          theme={selectTheme}
          components={{
            ...(this.props.choices?.length > 25 && {
              MenuList,
            }),
            MultiValue: SortableMultiValue,
            MultiValueLabel: SortableMultiValueLabel,
            DropdownIndicator,
            ClearIndicator,
            Option,
          }}
          value={selectedOption || []}
          placeholder={this.props.intl.formatMessage(messages.select)}
          onChange={this.handleChange}
          isClearable
          isMulti
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
