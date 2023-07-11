import { map, filter, toPairs, groupBy } from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import { compose } from 'redux';

import { FormFieldWrapper } from '@plone/volto/components';
import withQueryString from './../hocs/withQueryString';
import { defineMessages, useIntl } from 'react-intl';

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

const SelectWidget = (props) => {
  const {
    id,
    choices,
    value,
    onChange,
    placeholder,
    querystring,
    vocabBaseUrl,
    getVocabulary,
    filterOptions = identity,
  } = props;

  const intl = useIntl();
  // const [, setSelectedOption] = useState(
  //   value ? { label: value.title, value: value.value } : {},
  // );

  useEffect(() => {
    if (!choices && vocabBaseUrl) {
      getVocabulary({ vocabNameOrURL: vocabBaseUrl });
    }
  }, [choices, getVocabulary, vocabBaseUrl]);
  // const [search, setSearch] = useState();

  // const loadOptions = (search, previousOptions, additional) => {
  //   let hasMore = itemsTotal > previousOptions.length;
  //   if (hasMore) {
  //     const offset = search !== search ? 0 : additional.offset;
  //     getVocabulary({
  //       vocabNameOrURL: vocabBaseUrl,
  //       query: search,
  //       start: offset,
  //     });
  //     setSearch(search);

  //     return {
  //       options:
  //         intersection(previousOptions, choices).length === choices.length
  //           ? []
  //           : choices,
  //       hasMore: hasMore,
  //       additional: {
  //         offset: offset === additional.offset ? offset + 25 : offset,
  //       },
  //     };
  //   }
  //   return null;
  // };

  // /* Customized to pass object instead of plain string value */
  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);

  //   onChange(id, {
  //     value: selectedOption.value,
  //     title: selectedOption.label,
  //   });
  // };

  const isDisabled = false;
  const { indexes = [] } = querystring;

  const Select = props.reactSelect.default;

  return (
    <FormFieldWrapper {...props}>
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
export default compose(
  withQueryString,
  injectLazyLibs(['reactSelect']),
)(SelectWidget);
