/**
 * CheckboxGroupWidget component.
 * @module components/manage/Widgets/CheckboxGroupWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import map from 'lodash/map';
import without from 'lodash/without';
import { injectIntl } from 'react-intl';
import {
  getVocabFromHint,
  getVocabFromField,
  getVocabFromItems,
} from '@plone/volto/helpers/Vocabularies/Vocabularies';
import { Checkbox } from 'semantic-ui-react';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import {
  getVocabulary,
  getVocabularyTokenTitle,
} from '@plone/volto/actions/vocabularies/vocabularies';

/**
 * CheckboxGroupWidget component class.
 * @function CheckboxGroupWidget
 * @returns {string} Markup of the component.
 */
class CheckboxGroupWidget extends Component {
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
    filterChoices: PropTypes.arrayOf(PropTypes.string),
    error: PropTypes.arrayOf(PropTypes.string),
    getVocabulary: PropTypes.func.isRequired,
    getVocabularyTokenTitle: PropTypes.func.isRequired,
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
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    filterChoices: null,
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
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (
      (!this.props.choices || this.props.choices?.length === 0) &&
      this.props.vocabBaseUrl
    ) {
      this.props.getVocabulary({
        vocabNameOrURL: this.props.vocabBaseUrl,
        size: -1,
        subrequest: this.props.lang,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.vocabBaseUrl !== prevProps.vocabBaseUrl &&
      (!this.props.choices || this.props.choices?.length === 0)
    ) {
      this.props.getVocabulary({
        vocabNameOrURL: this.props.vocabBaseUrl,
        size: -1,
        subrequest: this.props.lang,
      });
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { id, choices, value, onChange, filterChoices, additionalChoices } =
      this.props;

    let options = this.props.vocabBaseUrl
      ? this.props.choices
      : [
          ...map(choices, (option) => ({
            value: option[0],
            label:
              // Fix "None" on the serializer, to remove when fixed in p.restapi
              option[1] !== 'None' && option[1] ? option[1] : option[0],
          })),
        ];

    if (additionalChoices) {
      options = [...(options || []), ...additionalChoices];
    }

    if (filterChoices) {
      options = filter(options, (item) => filterChoices.includes(item.value));
    }

    return (
      <FormFieldWrapper {...this.props}>
        {options.map((option) => (
          <Checkbox
            label={option.label}
            key={option.value}
            name={id}
            value={option.value}
            checked={includes(value, option.value)}
            onChange={(e, data) => {
              const newValue = value || [];
              if (data.checked) {
                onChange(id, [...newValue, data.value]);
              } else {
                onChange(id, without(newValue, data.value));
              }
            }}
          />
        ))}
      </FormFieldWrapper>
    );
  }
}

export const CheckboxGroupWidgetComponent = injectIntl(CheckboxGroupWidget);

export default connect(
  (state, props) => {
    const vocabBaseUrl = !props.choices
      ? getVocabFromHint(props) ||
        getVocabFromField(props) ||
        getVocabFromItems(props)
      : '';

    const vocabState =
      state.vocabularies?.[vocabBaseUrl]?.subrequests?.[state.intl.locale];

    // If the schema already has the choices in it, then do not try to get the vocab,
    // even if there is one
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
      // There is a moment that vocabState is not there yet, so we need to pass the
      // vocabBaseUrl to the component.
    } else if (vocabBaseUrl) {
      return {
        vocabBaseUrl,
        lang: state.intl.locale,
      };
    }
    return { lang: state.intl.locale };
  },
  { getVocabulary, getVocabularyTokenTitle },
)(CheckboxGroupWidgetComponent);
