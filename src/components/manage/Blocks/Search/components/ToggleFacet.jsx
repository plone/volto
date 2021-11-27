import React from 'react';
import { Radio, Header } from 'semantic-ui-react';

const ToggleFacet = (props) => {
  const { facet, isEditMode, onChange, value } = props; // value, choices, isMulti, onChange,

  return (
    <div className="checkbox-facet">
      <Header as="h4">{facet?.title ?? facet?.field?.label}</Header>
      <div className="entries">
        <Radio
          toggle
          checked={value}
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
  return !!selectedValue;
};

ToggleFacet.valueToQuery = ({ value, facet }) => {
  return {
    i: facet.field.value,
    o: value
      ? 'plone.app.querystring.operation.boolean.isTrue'
      : 'plone.app.querystring.operation.boolean.isFalse',
    v: '',
  };
};

export default ToggleFacet;
