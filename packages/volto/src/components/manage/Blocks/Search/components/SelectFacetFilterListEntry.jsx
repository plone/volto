import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

function SelectFacetFilterListEntry(props) {
  const { facet, isEditMode, setFacets, facets } = props;
  return typeof facets[facet] === 'string' ? (
    <Label size="small">
      {facets[facet]}
      <Icon
        name="delete"
        onClick={() => {
          !isEditMode &&
            setFacets({
              ...facets,
              [facet]: '',
            });
        }}
      />
    </Label>
  ) : (
    <>
      {facets[facet].map((entry, i) => (
        <Label size="small" key={i}>
          {entry}
          <Icon
            name="delete"
            onClick={() => {
              const entries = facets[facet].filter((item) => item !== entry);
              !isEditMode &&
                setFacets({
                  ...facets,
                  [facet]: entries,
                });
            }}
          />
        </Label>
      ))}
    </>
  );
}

export default SelectFacetFilterListEntry;
