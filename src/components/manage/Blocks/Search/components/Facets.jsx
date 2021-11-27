import React from 'react';
import { resolveExtension } from '@plone/volto/helpers/Extensions/withBlockExtensions';
import config from '@plone/volto/registry';
import { hasNonValueOperation } from '../utils';

const showFacet = (index) => {
  const { values } = index;
  return index
    ? hasNonValueOperation(index.operations || [])
      ? true
      : values && Object.keys(values).length > 0
    : values && Object.keys(values).length > 0;
};

const Facets = (props) => {
  const {
    querystring,
    data = {},
    facets,
    setFacets,
    facetWrapper,
    isEditMode,
  } = props;
  const { search } = config.blocks.blocksConfig;

  const FacetWrapper = facetWrapper;
  const query_to_values = Object.assign(
    {},
    ...(data?.query?.query?.map(({ i, v }) => ({ [i]: v })) || []),
  );

  return (
    <>
      {data?.facets
        ?.filter((facet) => !facet.hidden)
        .map((facet) => {
          const field = facet?.field?.value;
          const index = querystring.indexes[field] || {};
          const { values = {} } = index;

          const choices = Object.keys(values)
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

          const isMulti = facet.multiple;
          const selectedValue = facets[facet?.field?.value];

          // TODO :handle changing the type of facet (multi/nonmulti)

          let value = selectedValue
            ? isMulti
              ? Array.isArray(selectedValue)
                ? selectedValue.map((v) => ({
                    value: v,
                    label: index.values?.[v]?.title,
                  }))
                : []
              : {
                  value: selectedValue,
                  label: index.values?.[selectedValue]?.title,
                }
            : [];

          const { view: FacetWidget } = resolveExtension(
            'type',
            search.extensions.facetWidgets.types,
            facet,
          );

          const {
            rewriteOptions = (name, options) => options,
          } = search.extensions.facetWidgets;

          return FacetWrapper && (isEditMode || showFacet(index)) ? (
            <FacetWrapper key={facet['@id']}>
              <FacetWidget
                facet={facet}
                choices={rewriteOptions(facet?.field?.value, choices)}
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
    </>
  );
};

export default Facets;
