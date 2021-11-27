import React from 'react';
import { Accordion, Button, Label, Icon } from 'semantic-ui-react';
import { Icon as VoltoIcon } from '@plone/volto/components';
import downSVG from '@plone/volto/icons/down-key.svg';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  currentFilters: {
    id: 'Current filters applied',
    defaultMessage: 'Current filters applied',
  },
  clearFilters: {
    id: 'Clear filters',
    defaultMessage: 'Clear filters',
  },
});

/**
 * A list of active filtered values and controls to clear those filters.
 *
 */
const FilterList = (props) => {
  const { data, facets, setFacets, isEditMode } = props;
  const [isOpened, setIsOpened] = React.useState(false);

  // TODO: the facets are merged with the default query. We need to untangle
  // and claim only the original facet values
  const showFilterList = !Object.values(facets).every((facet) => !facet.length);

  const currentFilters = Object.fromEntries(
    Object.entries(facets).filter((v) => v[1] && v[0] !== 'SearchableText'),
  );

  const totalFilters = [].concat.apply([], Object.values(currentFilters))
    .length;

  // console.log({ data, facets, showFilterList, currentFilters, totalFilters });

  const intl = useIntl();

  return showFilterList && Object.keys(currentFilters).length ? (
    <Accordion className="filter-listing">
      <Accordion.Title
        className="filter-list-header"
        active={isOpened}
        onClick={() => setIsOpened(!isOpened)}
      >
        <div className="filter-list-title">
          <VoltoIcon name={downSVG} size="18px" />
          {intl.formatMessage(messages.currentFilters)}: {totalFilters}
        </div>
        <Button
          icon
          basic
          compact
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            !isEditMode && setFacets({});
          }}
        >
          <Icon name="trash" />
          {intl.formatMessage(messages.clearFilters)}
        </Button>
      </Accordion.Title>
      <Accordion.Content className="filter-list-content" active={isOpened}>
        <div className="filter-list">
          {Object.keys(facets || {}).map((facet, i) => (
            <div key={i}>
              {facets[facet].length > 0 && (
                <div className="filter-list-group" key={i}>
                  {data?.facets?.map((f, i) => {
                    return facet === f?.field?.value ? (
                      <span className="label-title" key={i}>
                        {f.title || f?.field?.label}:
                      </span>
                    ) : (
                      ''
                    );
                  })}
                  {typeof facets[facet] === 'string' ? (
                    <Label size="small" key={i}>
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
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </Accordion.Content>
    </Accordion>
  ) : null;
};

export default FilterList;
