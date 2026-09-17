/**
 * Field definition helpers for the fieldset-based (non-blocks) view.
 * @module components/theme/FieldsetView/fields
 */
import { getWidget } from '@plone/volto/helpers/Widget/utils';
import type { GetTypeResponse, JSONSchema } from '@plone/types';

type SchemaProperty = GetTypeResponse['properties'][string];

/**
 * A schema property, resolved for rendering: the property as the backend sent
 * it, plus the field's own `id` and the name of the widget to render it with.
 */
export type FieldDefinition = Partial<SchemaProperty> & {
  id: string;
  widget: string;
};

/**
 * Build the definition of a single field from the content type schema.
 */
export const getFieldDefinition = (
  schema: JSONSchema | undefined,
  fieldName: string,
): FieldDefinition => {
  const property = schema?.properties?.[fieldName];
  return {
    ...property,
    id: fieldName,
    widget: getWidget(fieldName, property),
  };
};

/**
 * Build the definitions of the named fields, in the order given.
 *
 * A fieldset with no `fields` yields an empty list rather than throwing.
 */
export const getFields = (
  schema: JSONSchema | undefined,
  fieldnames: string[] | undefined,
): FieldDefinition[] =>
  (fieldnames ?? []).map((fieldName) => getFieldDefinition(schema, fieldName));
