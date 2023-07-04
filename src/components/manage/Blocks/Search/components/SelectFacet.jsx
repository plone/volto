import React from 'react';
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

const SelectFacet = (props) => {
  const {
    facet,
    choices,
    reactSelect,
    isMulti,
    onChange,
    value,
    isEditMode,
  } = props;
  const Select = reactSelect.default;
  const v = Array.isArray(value) && value.length === 0 ? null : value;

  return (
    <Select
      placeholder={facet?.title ?? (facet?.field?.label || 'select...')}
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
