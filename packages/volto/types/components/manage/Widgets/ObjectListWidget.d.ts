export default ObjectListWidget;
/**
 * Lists the items of an object list, as accordions (the default) or as a
 * table (`layout: 'table'`), where each item is edited in a dialog.
 *
 * The item schema comes from `schemaName` (a registered schema utility), from
 * `schema`, or from a schema function, called as `schema({ ...props, props,
 * intl })`. An unresolved schema falls back to an empty item schema.
 *
 * Options:
 *
 * - `layout`: `'accordion'` (default) or `'table'`. The table has the item
 *   actions (a menu with Move up, Move down, Duplicate and Remove, and a
 *   confirmation for Remove).
 * - `columns`: the item fields shown in the table (default: all fields).
 * - `cells`: `{ [field]: (value, item) => node }`, renders a table cell.
 * - `itemTitle`: a field name, or `(item, index) => string`, that names an
 *   item. `placeholderItemField` is an alias.
 * - `maxItems`: at this number of items Add and Duplicate are disabled.
 * - `validateItem`: `(item, index, items) => message`, run by the dialog
 *   before Save; a returned message blocks Save and is shown in the dialog.
 * - `fixedItems`: `true` makes the list fixed: items cannot be added or removed,
 *   so Add, Duplicate and Remove are hidden. Items stay editable and reorderable.
 * - `itemIds`: `false` writes no `@id` to the items, and keys the rows by
 *   their content.
 * - `schemaExtender(schema, data, intl)`: mutates the schema of each item.
 * - `activeObject` and `setActiveObject`: control the open accordion item.
 *
 * Errors of the items come from the form validation as `error.internalErrors`,
 * keyed by the index of the item. A failed submit opens the first item with
 * errors, and its row is marked.
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
declare function ObjectListWidget(props: any): React.JSX.Element;
import React from 'react';
