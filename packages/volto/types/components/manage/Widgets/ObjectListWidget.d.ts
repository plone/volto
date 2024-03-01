export default ObjectListWidget;
/**
 * This is a DataGridField-equivalent widget for schema-based values.
 * The shape of the items in the array is defined using a schema.
 *
 * ObjectListWidget can receive an optional `schemaExtender` prop which is
 * a function that can mutate the schema for each individual item in the array.
 * An example schema definition of the a field that renders with the
 * ObjectListWidget:
 *
 * ```jsx
 *  columns: {
 *    title: 'Columns',
 *    description: 'Leave empty to show all columns',
 *    schema: SomeItemSchema,
 *    widget: 'object_list',
 *    schemaExtender: (schema, data) => {
 *      const mutated = lodash.cloneDeep(schema);
 *      mutated.properties.extraField = {
 *        title: 'Extra field',
 *      }
 *      mutated.fieldsets[0].fields.push('extraField');
 *      return mutated;
 *    },
 *    activeObject: 0, // Current active object drilled down from the schema (if present)
 *    setActiveObject: () => {} // The current active object state updater function drilled down from the schema (if present)
 *  },
 * ```
 */
declare function ObjectListWidget(props: any): import("react/jsx-runtime").JSX.Element;
