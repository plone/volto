import React from 'react';
import { Radio, Header } from 'semantic-ui-react';

const ToggleFacet = (props) => {
  const { facet, isEditMode } = props; // value, choices, isMulti, onChange,
  // const facetValue = value;

  return (
    <div className="checkbox-facet">
      <Header as="h4">{facet.title}</Header>
      <div className="entries">
        <Radio toggle disabled={isEditMode} checked={true} />
      </div>
    </div>
  );
};

export default ToggleFacet;
