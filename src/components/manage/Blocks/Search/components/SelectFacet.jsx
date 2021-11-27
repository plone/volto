import React from 'react';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import {
  Option,
  DropdownIndicator,
} from '@plone/volto/components/manage/Widgets/SelectStyling';
import { selectTheme, customSelectStyles } from './SelectStyling';

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
      components={{ DropdownIndicator, Option }}
      isDisabled={isEditMode}
      onChange={(data) => {
        if (data) {
          onChange(
            facet.field.value,
            isMulti ? data.map(({ value }) => value) : [data.value],
          );
        } else {
          // data has been removed
          onChange(facet.field.value, []);
        }
      }}
      isMulti={facet.multiple}
      isClearable
      value={v}
    />
  );
};

SelectFacet.schemaEnhancer = ({ schema, formData }) => {
  // adds (enables) the 'multiple' field after the 'type' dropdown
  let { fields } = schema.fieldsets[0];
  const pos = fields.indexOf('type') + 1;
  fields = [
    ...fields.slice(0, pos),
    'multiple',
    ...fields.slice(pos, fields.length),
  ];
  schema.fieldsets[0].fields = fields;
  return schema;
};

export default injectLazyLibs('reactSelect')(SelectFacet);
