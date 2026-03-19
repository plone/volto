import React from 'react';
import { useIntl, defineMessages } from 'react-intl';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  Option,
  DropdownIndicator,
  MultiValueContainer,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { selectTheme, customSelectStyles } from './SelectStyling';
import {
  selectFacetSchemaEnhancer,
  selectFacetStateToValue,
  selectFacetValueToQuery,
} from './base';

const messages = defineMessages({
  selectOption: {
    id: 'Select option',
    defaultMessage: 'Select option',
  },
  select: {
    id: 'Select…',
    defaultMessage: 'Select…',
  },
});

const SelectFacet = (props) => {
  const { facet, choices, reactSelect, isMulti, onChange, value, isEditMode } =
    props;
  const intl = useIntl();
  const Select = reactSelect.default;
  const v = Array.isArray(value) && value.length === 0 ? null : value;

  return (
    <Select
      placeholder={
        facet?.title ??
        (facet?.field?.label || intl.formatMessage(messages.select))
      }
      aria-label={
        facet?.title ??
        facet?.field?.label ??
        intl.formatMessage(messages.selectOption)
      }
      className="react-select-container"
      classNamePrefix="react-select"
      options={choices}
      styles={customSelectStyles}
      theme={selectTheme}
      components={{ DropdownIndicator, Option, MultiValueContainer }}
      isDisabled={isEditMode}
      onChange={(data) => {
        if (data) {
          onChange(
            facet.field.value,
            isMulti ? data.map(({ value }) => value) : data.value,
          );
        } else {
          // data has been removed
          onChange(facet.field.value, isMulti ? [] : '');
        }
      }}
      isMulti={facet.multiple}
      isClearable
      value={v}
    />
  );
};

SelectFacet.schemaEnhancer = selectFacetSchemaEnhancer;
SelectFacet.stateToValue = selectFacetStateToValue;
SelectFacet.valueToQuery = selectFacetValueToQuery;

export default injectLazyLibs('reactSelect')(SelectFacet);
