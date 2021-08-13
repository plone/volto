import React from 'react';
import { Label, Icon } from 'semantic-ui-react';

const FilterList = (props) => {
  const { data, facets, setFacets, isEditMode } = props;

  return (
    <div className="filter-list">
      {Object.keys(facets || {}).map((facet, i) => (
        <div className="filter-list-wrapper" key={i}>
          {facets[facet].length > 0 && (
            <div className="filter-list-group">
              <Label.Group>
                <>
                  {data?.facets.map((f, i) => {
                    return facet === f?.field?.value ? (
                      <span className="label-title" key={i}>
                        {f.title || f?.field?.label}:
                      </span>
                    ) : (
                      ''
                    );
                  })}
                  {facets[facet].map((entry, i) => (
                    <Label key={i}>
                      {entry}
                      <Icon
                        name="delete"
                        onClick={() => {
                          const entries = facets[facet].filter(
                            (item) => item !== entry,
                          );
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
              </Label.Group>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterList;
