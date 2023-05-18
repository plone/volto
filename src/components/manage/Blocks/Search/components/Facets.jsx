import React, { useState, useMemo } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import { resolveExtension } from '@plone/volto/helpers/Extensions/withBlockExtensions';
import config from '@plone/volto/registry';
import { hasNonValueOperation, hasDateOperation } from '../utils';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  showAdvanced: { id: 'Show advanced', defaultMessage: 'Show advanced' },
  hideAdvanced: { id: 'Hide advanced', defaultMessage: 'Hide advanced' },
  showFilters: { id: 'Show filters', defaultMessage: 'Show filters' },
  hideFilters: { id: 'Hide filters', defaultMessage: 'Hide filters' },
});

const showFacet = (index) => {
  const { values } = index;
  return index
    ? hasNonValueOperation(index.operations || []) ||
      hasDateOperation(index.operations || [])
      ? true
      : values && Object.keys(values).length > 0
    : values && Object.keys(values).length > 0;
};

const Facets = (props) => {
  const [hidden, setHidden] = useState(true);
  const {
    querystring,
    data = {},
    facets,
    setFacets,
    facetWrapper,
    isEditMode,
  } = props;
  const { search } = config.blocks.blocksConfig;

  const advancedFilters = useMemo(() => {
    let count = 0;
    for (let facetSettings of data.facets || []) {
      if (facetSettings.advanced) {
        count++;
      }
    }

    if (count === data.facets?.length) {
      return 2;
    }
    if (count) {
      return 1;
    }
    return 0;
  }, [data.facets]);

  const FacetWrapper = facetWrapper;
  const query_to_values = Object.assign(
    {},
    ...(data?.query?.query?.map(({ i, v }) => ({ [i]: v })) || []),
  );
  const intl = useIntl();

  return (
    <>
      {data?.facets
        ?.filter((facetSettings) => !facetSettings.hidden)
        .map((facetSettings) => {
          const field = facetSettings?.field?.value;
          const isAdvanced = facetSettings?.advanced;
          const index = querystring.indexes[field] || {};
          const { values = {} } = index;

          let choices = Object.keys(values)
            .map((name) => ({
              value: name,
              label: values[name].title,
            }))
            // filter the available values based on the allowed values in the
            // base query
            .filter(({ value }) =>
              query_to_values[field]
                ? query_to_values[field].includes(value)
                : true,
            );

          choices = choices.sort((a, b) =>
            a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }),
          );

          const isMulti = facetSettings.multiple;
          const selectedValue = facets[facetSettings?.field?.value];
          const visible = (isAdvanced && !hidden) || !isAdvanced;

          // TODO :handle changing the type of facet (multi/nonmulti)

          const { view: FacetWidget, stateToValue } = resolveExtension(
            'type',
            search.extensions.facetWidgets.types,
            facetSettings,
          );

          let value = stateToValue({ facetSettings, index, selectedValue });

          const {
            rewriteOptions = (name, options) => options,
          } = search.extensions.facetWidgets;

          return FacetWrapper && (isEditMode || showFacet(index)) ? (
            <FacetWrapper
              key={facetSettings['@id']}
              facetSettings={facetSettings}
              visible={visible}
            >
              <FacetWidget
                facet={facetSettings}
                choices={rewriteOptions(facetSettings?.field?.value, choices)}
                isMulti={isMulti}
                value={value}
                isEditMode={isEditMode}
                onChange={(id, value) => {
                  !isEditMode && setFacets({ ...facets, [id]: value });
                }}
              />
            </FacetWrapper>
          ) : (
            ''
          );
        })}
      {advancedFilters > 0 && (
        <Grid.Column
          mobile={12}
          tablet={12}
          computer={12}
          className="toggle-advanced-facets"
        >
          <Button
            onClick={() => {
              setHidden((prevHidden) => !prevHidden);
            }}
          >
            {hidden
              ? advancedFilters === 2
                ? intl.formatMessage(messages.showFilters)
                : intl.formatMessage(messages.showAdvanced)
              : advancedFilters === 2
              ? intl.formatMessage(messages.hideFilters)
              : intl.formatMessage(messages.hideAdvanced)}
          </Button>
        </Grid.Column>
      )}
    </>
  );
};

export default Facets;
