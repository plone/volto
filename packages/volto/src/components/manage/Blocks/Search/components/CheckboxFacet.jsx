import React from 'react';
import { Checkbox, Header } from 'semantic-ui-react';
import {
  selectFacetSchemaEnhancer,
  selectFacetStateToValue,
  selectFacetValueToQuery,
} from './base';

/**
 * A facet that uses radio/checkboxes to provide an explicit list of values for
 * filtering
 */
const CheckboxFacet = (props) => {
  const {
    facet,
    facetCount,
    choices,
    isMulti,
    onChange,
    value,
    isEditMode,
    isFacetCountEnabled,
  } = props;
  const facetValue = value;

  return (
    <div className="checkbox-facet">
      <Header as="h4">{facet.title ?? facet?.field?.label}</Header>
      <div className="entries">
        {choices.map(({ label, value }, i) => {
          const count = facetCount?.data?.[value] || 0;

          return (
            <div className="entry" key={value}>
              {isFacetCountEnabled === true ? (
                <Checkbox
                  disabled={isEditMode}
                  label={`${label} (${count})`}
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
              ) : (
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

CheckboxFacet.schemaEnhancer = selectFacetSchemaEnhancer;
CheckboxFacet.stateToValue = selectFacetStateToValue;
CheckboxFacet.valueToQuery = selectFacetValueToQuery;

export default CheckboxFacet;
