/**
 * SelectWidget component.
 * @module components/manage/Widgets/SelectWidget
 */

import map from 'lodash/map';
import filter from 'lodash/filter';
import toPairs from 'lodash/toPairs';
import groupBy from 'lodash/groupBy';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { compose } from 'redux';

import { FormFieldWrapper } from '@plone/volto/components/manage/Widgets';
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
 * SelectWidget component function.
 * @function SelectWidget
 * @returns {string} Markup of the component.
 */
const SelectWidget = (props) => {
  const {
    choices = [],
    vocabBaseUrl,
    getVocabulary,
    id,
    value = null,
    onChange = () => {},
    placeholder,
    querystring,
    filterOptions = identity,
    description = null,
    required = false,
    error = [],
    loading = false,
    onBlur = () => {},
    onClick = () => {},
    onEdit = null,
    onDelete = null,
    items = { vocabulary: null },
    widgetOptions = { vocabulary: null },
    reactSelect,
    intl,
    ...rest
  } = props;

  useEffect(() => {
    if (!choices && vocabBaseUrl) {
      getVocabulary({ vocabNameOrURL: vocabBaseUrl });
    }
  }, [choices, vocabBaseUrl, getVocabulary]);

  const isDisabled = false;
  const { indexes = [] } = querystring;
  const Select = reactSelect.default;

  const wrapperProps = {
    ...rest,
    id,
    value,
    onChange,
    placeholder,
    querystring,
    filterOptions,
    description,
    required,
    error,
    loading,
    onBlur,
    onClick,
    onEdit,
    onDelete,
    items,
    widgetOptions,
    reactSelect,
    intl,
    choices,
  };

  return (
    <FormFieldWrapper {...wrapperProps}>
      <Select
        id={`field-${id}`}
        name={id}
        placeholder={placeholder ?? intl.formatMessage(messages.select)}
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
        value={{
          value: value?.value,
          label: indexes[value?.value]?.title,
        }}
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
};

SelectWidget.propTypes = {
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

export default compose(
  withQueryString,
  injectLazyLibs(['reactSelect']),
)(SelectWidget);
