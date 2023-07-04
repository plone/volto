import React from 'react';
import { Accordion, Button, Icon } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { isEmpty } from 'lodash';

import { Icon as VoltoIcon } from '@plone/volto/components';
import { resolveExtension } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

import downSVG from '@plone/volto/icons/down-key.svg';

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
  const { data = {}, facets = {}, setFacets, isEditMode } = props;
  const definedFacets = data.facets || [];
  const [isOpened, setIsOpened] = React.useState(false);

  const totalFilters = definedFacets.filter(
    ({ field }) =>
      field &&
      Object.keys(facets).includes(field.value) &&
      !isEmpty(facets[field.value]),
  ).length;

  const {
    types: facetWidgetTypes,
  } = config.blocks.blocksConfig.search.extensions.facetWidgets;

  const intl = useIntl();

  return totalFilters ? (
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
          {data.facets?.map((facetSettings, i) => {
            const {
              filterListComponent: FilterListComponent,
            } = resolveExtension('type', facetWidgetTypes, facetSettings);
            const facet = facetSettings?.field?.value;
            if (!facet) return null;

            return (
              <div key={i}>
                {Object.keys(facets).includes(facet) && !!facets[facet] && (
                  <div className="filter-list-group" key={i}>
                    <span className="label-title">
                      {facetSettings.title ?? facetSettings?.field?.label}
                    </span>
                    <FilterListComponent {...props} facet={facet} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Accordion.Content>
    </Accordion>
  ) : null;
};

export default FilterList;
