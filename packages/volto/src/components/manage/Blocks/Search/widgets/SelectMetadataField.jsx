/**
 * SelectWidget component.
 * @module components/manage/Widgets/SelectWidget
 */

import { map, filter, toPairs, groupBy } from 'lodash-es';
import { lazy, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const Select = lazy(() => import('react-select'));

/**
 * SelectWidget component function.
 * @function SelectWidget
 * @returns {string} Markup of the component.
 */
const SelectWidget = (props) => {
  const { choices, vocabBaseUrl, getVocabulary } = props;

  useEffect(() => {
    if (!choices && vocabBaseUrl) {
      getVocabulary({ vocabNameOrURL: vocabBaseUrl });
    }
  }, [choices, vocabBaseUrl, getVocabulary]);

  const {
    id,
    value,
    onChange,
    placeholder,
    querystring,
    filterOptions = identity,
  } = props;

  const isDisabled = false;
  const { indexes = [] } = querystring;

  return (
    <FormFieldWrapper {...props}>
      <Select
        id={`field-${id}`}
        name={id}
        placeholder={placeholder ?? props.intl.formatMessage(messages.select)}
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
  loading: false,
  value: null,
  onChange: () => {},
  onBlur: () => {},
  onClick: () => {},
  onEdit: null,
  onDelete: null,
};

export default compose(withQueryString)(SelectWidget);
