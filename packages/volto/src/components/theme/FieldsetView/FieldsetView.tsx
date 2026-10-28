/**
 * FieldsetView component.
 * @module components/theme/FieldsetView/FieldsetView
 */
import type { JSONSchema, JSONSchemaFieldsets } from '@plone/types';
import FieldView from './FieldView';
import { getFields } from './fields';

export type FieldsetViewProps = {
  /** The fieldset to render, as declared by the schema. */
  fieldset: JSONSchemaFieldsets;
  /** The schema the fieldset belongs to: a content type's, or a block's. */
  schema: JSONSchema | undefined;
  /** The content object or block data holding the fields' values. */
  data: Record<string, any>;
};

/**
 * One fieldset of a schema-driven view, used both by the default content view
 * for content types without blocks and by the default block view.
 *
 * The `default` fieldset is rendered without a heading, since its title says
 * nothing the page does not already say.
 */
const FieldsetView = ({ fieldset, schema, data }: FieldsetViewProps) => {
  const { id, title } = fieldset;
  const fields = getFields(schema, fieldset.fields);

  return (
    <div className="fieldset">
      {id !== 'default' && <h2>{title}</h2>}
      {fields.map((field) => (
        <FieldView key={field.id} field={field} data={data} />
      ))}
    </div>
  );
};

export default FieldsetView;
