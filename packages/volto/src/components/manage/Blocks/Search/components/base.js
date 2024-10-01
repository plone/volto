import { isEmpty } from 'lodash-es';

/**
 * Converts the state (extracted from URL) to options for the facet control
 *
 * Shared by the SelectFacet and CheckboxFacet
 */
export const selectFacetStateToValue = ({
  facetSettings,
  index,
  selectedValue,
}) => {
  const isMulti = facetSettings.multiple;
  return selectedValue
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
};

export const selectFacetSchemaEnhancer = ({ schema, formData }) => {
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

export const selectFacetValueToQuery = ({ value, facet }) => {
  return !isEmpty(value)
    ? {
        i: facet.field.value,
        o: Array.isArray(value)
          ? 'plone.app.querystring.operation.list.contains'
          : 'plone.app.querystring.operation.selection.is',
        v: value,
      }
    : undefined;
};
