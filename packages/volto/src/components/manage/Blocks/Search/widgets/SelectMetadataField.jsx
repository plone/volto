/**
 * SelectWidget component.
 * @module components/manage/Widgets/SelectWidget
 */

import { map, intersection, filter, toPairs, groupBy } from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { compose } from 'redux';

import { FormFieldWrapper } from '@plone/volto/components';
import withQueryString from './../hocs/withQueryString';
import { defineMessages } from 'react-intl';

import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

const identity = (a) => a;

const messages = defineMessages({
  select: {
    id: 'Select…',
    defaultMessage: 'Select…',
  },
});

/**
 * SelectWidget component class.
 * @function SelectWidget
 * @returns {string} Markup of the component.
 */
class SelectWidget extends Component {
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
    loading: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string,
      PropTypes.bool,
    ]),
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    wrapped: PropTypes.bool,
    querystring: PropTypes.object,
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
    loading: false,
    value: null,
    onChange: () => {},
    onBlur: () => {},
    onClick: () => {},
    onEdit: null,
    onDelete: null,
  };

  state = {
    selectedOption: this.props.value
      ? { label: this.props.value.title, value: this.props.value.value }
      : {},
  };

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (!this.props.choices && this.props.vocabBaseUrl) {
      this.props.getVocabulary({ vocabNameOrURL: this.props.vocabBaseUrl });
    }
  }

  /**
   * Initiate search with new query
   * @method loadOptions
   * @param {string} search Search query.
   * @param {string} previousOptions The previous options rendered.
   * @param {string} additional Additional arguments to pass to the next loadOptions.
   * @returns {undefined}
   */
  loadOptions = (search, previousOptions, additional) => {
    let hasMore = this.props.itemsTotal > previousOptions.length;
    if (hasMore) {
      const offset = this.state.search !== search ? 0 : additional.offset;
      this.props.getVocabulary({
        vocabNameOrURL: this.props.vocabBaseUrl,
        query: search,
        start: offset,
      });
      this.setState({ search });

      return {
        options:
          intersection(previousOptions, this.props.choices).length ===
          this.props.choices.length
            ? []
            : this.props.choices,
        hasMore: hasMore,
        additional: {
          offset: offset === additional.offset ? offset + 25 : offset,
        },
      };
    }
    return null;
  };

  /* Customized to pass object instead of plain string value */
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onChange(this.props.id, {
      value: selectedOption.value,
      title: selectedOption.label,
    });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      // choices,
      value,
      onChange,
      placeholder,
      querystring,
      filterOptions = identity,
    } = this.props;
    const isDisabled = false;
    const { indexes = [] } = querystring;

    const Select = this.props.reactSelect.default;

    return (
      <FormFieldWrapper {...this.props}>
        <Select
          id={`field-${id}`}
          name={id}
          placeholder={
            placeholder ?? this.props.intl.formatMessage(messages.select)
          }
          isDisabled={isDisabled}
          className="react-select-container"
          classNamePrefix="react-select"
          options={map(
            toPairs(
              groupBy(toPairs(filterOptions(indexes)), (item) => item[1].group),
            ),
            (group) => ({
              label: group[0],
              options: map(
                filter(group[1], (item) => item[1].enabled),
                (field) => ({
                  label: field[1].title,
                  value: field[0],
                }),
              ),
            }),
          )}
          styles={customSelectStyles}
          theme={selectTheme}
          components={{ DropdownIndicator, Option }}
          value={{ value: value?.value, label: indexes[value?.value]?.title }}
          onChange={(data) => {
            let dataValue = [];
            if (Array.isArray(data)) {
              for (let obj of data) {
                dataValue.push(obj.value);
              }
              return onChange(id, dataValue);
            }
            return onChange(id, data);
          }}
        />
      </FormFieldWrapper>
    );
  }
}

export default compose(
  withQueryString,
  injectLazyLibs(['reactSelect']),
)(SelectWidget);
