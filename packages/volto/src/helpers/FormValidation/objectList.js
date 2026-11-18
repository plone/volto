/**
 * Helpers for the item schemas of `ObjectListWidget` and `ObjectWidget`.
 * They are shared by the widgets and by the form validation of their items.
 * @module helpers/FormValidation/objectList
 */

import config from '@plone/volto/registry';

/**
 * The item schema used when no schema can be resolved (for example when
 * `schemaName` names no registered utility and no `schema` is given). The
 * rows still render, with no fields.
 */
export const EMPTY_ITEM_SCHEMA = {
  title: '',
  fieldsets: [{ id: 'default', title: 'Default', fields: [] }],
  properties: {},
  required: [],
};

/**
 * Resolves the item schema of an object list or object field.
 *
 * A registered `schema` utility named by `schemaName` wins over `schema`.
 * A schema function is called with the props and `intl`, as in
 * `schema({ ...props, props, intl })`.
 *
 * @param {Object} options
 * @param {Object|Function} options.schema The item schema, or a function.
 * @param {string} [options.schemaName] Name of a registered schema utility.
 * @param {Object} [options.props] The widget props, passed to a schema function.
 * @param {Object} [options.intl] The react-intl object.
 * @returns {Object} The item schema.
 */
export const resolveItemSchema = ({ schema, schemaName, props = {}, intl }) => {
  const utility = schemaName
    ? config.getUtility({ type: 'schema', name: schemaName })
    : {};
  const source = utility.method || schema;
  const resolved =
    typeof source === 'function' ? source({ ...props, props, intl }) : source;
  return resolved || EMPTY_ITEM_SCHEMA;
};

/**
 * The schema of one item: the base item schema, passed through the
 * `schemaExtender(schema, data, intl)` of the field when it has one.
 *
 * @param {Object} options
 * @param {Object} options.baseSchema The resolved item schema.
 * @param {Object} options.item The item (or the draft of an item).
 * @param {Function} [options.schemaExtender] Mutates the schema per item.
 * @param {Object} [options.intl] The react-intl object.
 * @returns {Object} The schema of the item.
 */
export const itemSchemaFor = ({ baseSchema, item, schemaExtender, intl }) =>
  typeof schemaExtender === 'function'
    ? schemaExtender(baseSchema, item, intl)
    : baseSchema;

/**
 * One key per entry, for rows that are not keyed by `@id` (`itemIds: false`).
 *
 * A key follows its entry when the entries are reordered, so the list keeps
 * focus and selection. An entry is keyed by its `@id` when it has one no
 * earlier entry already used. Otherwise it is keyed by its content, and a
 * repeat of an entry already keyed gets a `~2`, `~3`… suffix.
 *
 * @param {Object[]} rows The entries, in order.
 * @returns {string[]} One key per entry.
 */
export const rowKeys = (rows) => {
  const seen = new Set();
  const repeats = new Map();
  return rows.map((row) => {
    const id = row?.['@id'];
    if (typeof id === 'string' && id && !seen.has(id)) {
      seen.add(id);
      return id;
    }
    const content = `#${JSON.stringify(row)}`;
    const count = (repeats.get(content) ?? 0) + 1;
    repeats.set(content, count);
    return count === 1 ? content : `${content}~${count}`;
  });
};
