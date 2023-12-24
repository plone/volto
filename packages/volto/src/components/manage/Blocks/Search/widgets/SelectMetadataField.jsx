/**
 * SelectWidget component.
 * @module components/manage/Widgets/SelectWidget
 */

import { map, filter, toPairs, groupBy } from 'lodash';
import { useEffect } from 'react';
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
 * SelectWidget component function.
 * @function SelectWidget
 * @returns {string} Markup of the component.
 */
const SelectWidget = (props) => {
  // const [selectedOption, setSelectedOption] = useState(
  //   props.value
  //     ? { label: props.value.title, value: props.value.value }
  //     : {}
  // );

  const { choices, vocabBaseUrl, getVocabulary } = props;

  useEffect(() => {
    if (!choices && vocabBaseUrl) {
      getVocabulary({ vocabNameOrURL: vocabBaseUrl });
    }
  }, [choices, vocabBaseUrl, getVocabulary]);

  // const loadOptions = (search, previousOptions, additional) => {
  //   let hasMore = props.itemsTotal > previousOptions.length;
  //   if (hasMore) {
  //     const offset = selectedOption.search !== search ? 0 : additional.offset;
  //     props.getVocabulary({
  //       vocabNameOrURL: props.vocabBaseUrl,
  //       query: search,
  //       start: offset,
  //     });
  //     setSelectedOption({ search });

  //     return {
  //       options:
  //         intersection(previousOptions, props.choices).length ===
  //           props.choices.length
  //           ? []
  //           : props.choices,
  //       hasMore: hasMore,
  //       additional: {
  //         offset: offset === additional.offset ? offset + 25 : offset,
  //       },
  //     };
  //   }
  //   return null;
  // };

  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  //   props.onChange(props.id, {
  //     value: selectedOption.value,
  //     title: selectedOption.label,
  //   });
  // };

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
  const Select = props.reactSelect.default;

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

export default compose(
  withQueryString,
  injectLazyLibs(['reactSelect']),
)(SelectWidget);
