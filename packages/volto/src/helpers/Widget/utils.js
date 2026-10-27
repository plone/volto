/**
 * Map a field to the name of the widget that should render it.
 *
 * @deprecated Nothing in Volto calls this any more. It papered over two gaps in
 * the `views` registry — no entries for `title`/`description` by field id, and
 * no `factory` registry at all — both of which are now filled, so
 * `getWidgetView` resolves the same fields directly from the raw schema
 * property. It is kept for add-ons that import it, and will be removed in a
 * future major release.
 *
 * @method getWidget
 * @param {string} id Field id
 * @param {Object} field Schema property
 * @returns {string} Widget name.
 */
export const getWidget = (id, field) => {
  if (id === 'title') {
    return 'title';
  }
  if (id === 'description') {
    return 'description';
  }
  if (id === 'subjects') {
    return 'tags';
  }
  if (field?.factory === 'Choice') {
    return 'choices';
  }
  if (field?.factory === 'Relation Choice') {
    return 'relation';
  }
  if (field?.factory === 'Relation List') {
    return 'relations';
  }
  if (field?.factory === 'Image') {
    return 'image';
  }
  if (field?.factory === 'File') {
    return 'file';
  }
  return field?.widget || field?.type || id;
};
