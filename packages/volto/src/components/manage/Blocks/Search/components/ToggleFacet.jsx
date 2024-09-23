import React from 'react';
import { Radio, Header } from 'semantic-ui-react';

const ToggleFacet = (props) => {
  const { facet, isEditMode, onChange, value } = props; // value, choices, isMulti, onChange,

  return (
    <div className="checkbox-facet">
      <Header as="h4">{facet?.title ?? facet?.field?.label}</Header>
      <div className="radio">
        <Radio
          toggle
          checked={value || typeof value === 'string'}
          disabled={isEditMode}
          onChange={(e, { checked }) => {
            onChange(facet.field.value, checked);
          }}
        />
      </div>
    </div>
  );
};

ToggleFacet.stateToValue = ({ facetSettings, index, selectedValue }) => {
  return selectedValue || typeof selectedValue === 'string';
};

ToggleFacet.valueToQuery = ({ value, facet }) => {
  return value || typeof value === 'string'
    ? {
        i: facet.field.value,
        o: 'plone.app.querystring.operation.boolean.isTrue',
        v: '',
      }
    : null;
};

export default ToggleFacet;
