import React from 'react';
import { Checkbox, Header } from 'semantic-ui-react';

const SelectFacet = (props) => {
  const { facet, choices, isMulti, onChange, value, isEditMode } = props;
  const facetValue = value;

  return (
    <div className="checkbox-facet">
      <Header as="h4">{facet.title}</Header>
      <div className="entries">
        {choices.map(({ label, value }, i) => (
          <div className="entry">
            <Checkbox
              disabled={isEditMode}
              label={label}
              radio={!isMulti}
              checked={
                isMulti
                  ? !!facetValue?.find((f) => f.value === value)
                  : facetValue && facetValue.value === value
              }
              onChange={(e, { checked }) =>
                onChange(
                  facet.field.value,
                  isMulti
                    ? [
                        ...facetValue
                          .filter((f) => f.value !== value)
                          .map((f) => f.value),
                        ...(checked ? [value] : []),
                      ]
                    : checked
                    ? value
                    : null,
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectFacet;
