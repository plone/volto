import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { map, intersection, filter, toPairs, groupBy } from 'lodash';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { compose } from 'redux';
import { defineMessages, useIntl } from 'react-intl';

import {
  Option,
  DropdownIndicator,
  selectTheme,
  customSelectStyles,
} from '@plone/volto/components/manage/Widgets/SelectStyling';

import {
  FormFieldWrapper,
  withQueryString,
} from '@plone/volto/components';

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
 *  
 * @returns {string} Markup of the component 
 */
const SelectWidget = ({
  id,
  title,
  description,
  required,
  error,
  loading,
  value,
  onChange,
  onBlur,
  onClick,
  onEdit,
  onDelete,
  wrapped,
  querystring,
  reactSelect,
}) => {
  const intl = useIntl();

  const [selectedOption, setSelectedOption] = useState(
    value
      ? { label: value.title, value: value.value }
      : {}
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!reactSelect.choices && reactSelect.vocabBaseUrl) {
      reactSelect.getVocabulary({
        vocabNameOrURL: reactSelect.vocabBaseUrl,
      });
    }
  }, [reactSelect.choices, reactSelect.vocabBaseUrl]);

  const loadOptions = (search, previousOptions, additional) => {
    let hasMore = reactSelect.itemsTotal > previousOptions.length;

    if (hasMore) {
      const offset = search !== search ? 0 : additional.offset;
      reactSelect.getVocabulary({
        vocabNameOrURL: reactSelect.vocabBaseUrl,
        query: search,
        start: offset,
      });
      setSearch(search);

      return {
        options:
          intersection(previousOptions, reactSelect.choices).length ===
          reactSelect.choices.length
            ? []
            : reactSelect.choices,
        hasMore: hasMore,
        additional: {
          offset: offset === additional.offset ? offset + 25 : offset,
        },
      };
    }
    return null;
  };

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    onChange(id, {
      value: selectedOption.value,
      title: selectedOption.label,
    });
  };

  return (
    <FormFieldWrapper
      id={id}
      title={title}
      description={description}
      required={required}
      error={error}
      loading={loading}
      wrapped={wrapped}
      onEdit={onEdit}
      onDelete={onDelete}
    >
      <reactSelect.default
        id={`field-${id}`}
        name={id}
        placeholder={
          placeholder ?? intl.formatMessage(messages.select)
        }
        isDisabled={false}
        className="react-select-container"
        classNamePrefix="react-select"
        options={map(
          toPairs(
            groupBy(
              toPairs(filterOptions(querystring.indexes)),
              (item) => item[1].group
            )
          ),
          (group) => ({
            label: group[0],
            options: map(
              filter(group[1], (item) => item[1].enabled),
              (field) => ({
                label: field[1].title,
                value: field[0],
              })
            ),
          })
        )}
        styles={customSelectStyles}
        theme={selectTheme}
        components={{ DropdownIndicator, Option }}
        value={{
          value: value?.value,
          label: querystring.indexes[value?.value]?.title,
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
  reactSelect: PropTypes.shape({
    choices: PropTypes.array,
    vocabBaseUrl: PropTypes.string,
    itemsTotal: PropTypes.number,
    getVocabulary: PropTypes.func,
    reactSelect: PropTypes.object,
  }),
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

export default compose(
  withQueryString,
  injectLazyLibs(['reactSelect']),
)(SelectWidget);
