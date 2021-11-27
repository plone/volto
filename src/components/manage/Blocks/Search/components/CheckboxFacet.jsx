import React from 'react';
import { Checkbox, Header } from 'semantic-ui-react';

/**
 * A facet that uses radio/checkboxes to provide an explicit list of values for
 * filtering
 */
const CheckboxFacet = (props) => {
  const { facet, choices, isMulti, onChange, value, isEditMode } = props;
  const facetValue = value;

  return (
    <div className="checkbox-facet">
      <Header as="h4">{facet.title}</Header>
      <div className="entries">
        {choices.map(({ label, value }, i) => (
          <div className="entry" key={value}>
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

CheckboxFacet.schemaEnhancer = ({ schema, formData }) => {
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

export default CheckboxFacet;
