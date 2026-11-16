import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Accordion, Button, Confirm, Segment } from 'semantic-ui-react';
import DragDropList from '@plone/volto/components/manage/DragDropList/DragDropList';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';
import ModalForm from '@plone/volto/components/manage/Form/ModalForm';
import { applySchemaDefaults } from '@plone/volto/helpers/Blocks/Blocks';
import { reorderArray } from '@plone/volto/helpers/Utils/Utils';
import {
  itemSchemaFor,
  resolveItemSchema,
  rowKeys,
} from '@plone/volto/helpers/FormValidation/objectList';
import ObjectWidget from '@plone/volto/components/manage/Widgets/ObjectWidget';

import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import deleteSVG from '@plone/volto/icons/delete.svg';
import addSVG from '@plone/volto/icons/add.svg';
import dragSVG from '@plone/volto/icons/drag.svg';
import { v4 as uuid } from 'uuid';

const messages = defineMessages({
  labelRemoveItem: {
    id: 'Remove item',
    defaultMessage: 'Remove item',
  },
  labelCollapseItem: {
    id: 'Collapse item',
    defaultMessage: 'Collapse item',
  },
  labelShowItem: {
    id: 'Show item',
    defaultMessage: 'Show item',
  },
  emptyObjectList: {
    id: 'Empty object list',
    defaultMessage: 'Empty object list',
  },
  add: {
    id: 'Add (object list)',
    defaultMessage: 'Add',
  },
  edit: {
    id: 'Edit',
    defaultMessage: 'Edit',
  },
  actions: {
    id: 'Actions for item',
    defaultMessage: 'Actions for item',
  },
  moveUp: {
    id: 'Move up',
    defaultMessage: 'Move up',
  },
  moveDown: {
    id: 'Move down',
    defaultMessage: 'Move down',
  },
  duplicate: {
    id: 'Duplicate',
    defaultMessage: 'Duplicate',
  },
  remove: {
    id: 'Remove',
    defaultMessage: 'Remove',
  },
  removeConfirm: {
    id: 'Remove this item?',
    defaultMessage: 'Remove this item?',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

// Below this container width (28rem, as in the block settings sidebar) the
// table shows each row as a list of cells.
const NARROW_WIDTH = 448;

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
const ObjectListWidget = (props) => {
  const {
    block,
    fieldSet,
    id,
    value = [],
    onChange,
    schemaExtender,
    schemaName,
    layout = 'accordion',
    columns,
    cells = {},
    maxItems,
    validateItem,
    itemIds = true,
    fixedItems = false,
  } = props;
  const itemTitle = props.itemTitle ?? props.placeholderItemField;

  const intl = useIntl();

  const [localActiveObject, setLocalActiveObject] = React.useState(
    props.activeObject ?? value.length - 1,
  );

  let activeObject, setActiveObject;
  if (
    (props.activeObject || props.activeObject === 0) &&
    props.setActiveObject
  ) {
    activeObject = props.activeObject;
    setActiveObject = props.setActiveObject;
  } else {
    activeObject = localActiveObject;
    setActiveObject = setLocalActiveObject;
  }

  // The item schema. This allows to use a `schemaName` prop defined as source
  // of the schema, if not present, it uses the schema prop.
  const objectSchema = resolveItemSchema({
    schema: props.schema,
    schemaName,
    props,
    intl,
  });

  const isTable = layout === 'table';
  const atMax = maxItems !== undefined && value.length >= maxItems;

  // Table state: the item being edited in the dialog, the open item menu,
  // the item waiting for a Remove confirmation, and the dialog error.
  const [dialog, setDialog] = React.useState(null);
  const [dialogError, setDialogError] = React.useState(null);
  const [menuIndex, setMenuIndex] = React.useState(null);
  const [removeIndex, setRemoveIndex] = React.useState(null);
  const [narrow, setNarrow] = React.useState(false);
  const tableRef = React.useRef(null);

  React.useEffect(() => {
    const node = tableRef.current;
    if (!node || typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(([entry]) => {
      setNarrow(entry.contentRect.width < NARROW_WIDTH);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [isTable]);

  const keys = itemIds === false ? rowKeys(value) : null;
  const childIdOf = (item, index) => (keys ? keys[index] : item?.['@id']);

  // Items are created with an `@id` unless `itemIds` is false.
  const newItem = () => (itemIds === false ? {} : { '@id': uuid() });

  const schemaFor = (item) =>
    itemSchemaFor({
      baseSchema: objectSchema,
      item,
      schemaExtender,
      intl,
    });

  const buildItem = (data) =>
    applySchemaDefaults({
      data,
      schema: schemaFor(data),
      intl,
    });

  const itemName = (item, index) => {
    const name =
      typeof itemTitle === 'function'
        ? itemTitle(item, index)
        : itemTitle
          ? item?.[itemTitle]
          : undefined;
    return name || objectSchema.title;
  };

  // Errors of the items, as left by the last failed submit.
  const internalErrors = props.error?.internalErrors || {};
  const failedIndexes = Object.keys(internalErrors)
    .map(Number)
    .sort((a, b) => a - b);
  const firstFailed = failedIndexes[0];

  const summarize = (itemErrors) =>
    Object.entries(itemErrors)
      .map(
        ([field, messagesOfField]) =>
          `${objectSchema.properties?.[field]?.title || field}: ${[]
            .concat(messagesOfField)
            .flat()
            .join(', ')}`,
      )
      .join('. ');

  const openEdit = (index, errorMessage = null) => {
    const item = value[index];
    setDialog({
      index,
      draft: { ...item },
      schema: schemaFor(item),
    });
    setDialogError(errorMessage);
    setMenuIndex(null);
  };

  const openAdd = () => {
    const draft = buildItem(newItem());
    setDialog({ index: null, draft, schema: schemaFor(draft) });
    setDialogError(null);
  };

  const closeDialog = () => {
    setDialog(null);
    setDialogError(null);
  };

  // Writes the draft back on Save. A validateItem message blocks it.
  const saveDialog = (draft) => {
    const index = dialog.index === null ? value.length : dialog.index;
    const nextItems =
      dialog.index === null
        ? [...value, draft]
        : value.map((v, i) => (i === dialog.index ? draft : v));
    const message = validateItem ? validateItem(draft, index, nextItems) : null;
    if (message) {
      setDialogError(String(message));
      return;
    }
    onChange(id, nextItems);
    closeDialog();
  };

  // A failed submit opens the first item with errors. In the table, the
  // dialog of that item opens with a summary of its errors.
  React.useEffect(() => {
    if (firstFailed === undefined) return;
    if (isTable) {
      openEdit(firstFailed, summarize(props.error.internalErrors[firstFailed]));
    } else {
      setActiveObject(firstFailed);
    }
    // Only a new failed submit (a new error object) opens an item.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.error]);

  const moveItem = (index, to) => {
    onChange(id, reorderArray(value, index, to));
    setMenuIndex(null);
  };

  const duplicateItem = (index) => {
    const copy = { ...value[index] };
    if (itemIds !== false) {
      copy['@id'] = uuid();
    }
    onChange(id, [
      ...value.slice(0, index + 1),
      copy,
      ...value.slice(index + 1),
    ]);
    setMenuIndex(null);
  };

  const cellValue = (name, item) => {
    if (typeof cells[name] === 'function') {
      return cells[name](item?.[name], item);
    }
    const fieldValue = item?.[name];
    if (fieldValue === undefined || fieldValue === null) return '';
    if (Array.isArray(fieldValue)) {
      return fieldValue
        .map((entry) =>
          typeof entry === 'object' && entry !== null
            ? entry.title || entry['@id'] || ''
            : String(entry),
        )
        .join(', ');
    }
    if (typeof fieldValue === 'object') {
      return fieldValue.title || fieldValue['@id'] || '';
    }
    return String(fieldValue);
  };

  const columnNames = Array.isArray(columns)
    ? columns
    : Object.keys(objectSchema.properties || {});

  function handleChangeActiveObject(e, blockProps) {
    const { index } = blockProps;
    const newIndex = activeObject === index ? -1 : index;

    setActiveObject(newIndex);
  }

  const topLayerShadow = '0 1px 1px rgba(0,0,0,0.15)';
  const secondLayer = ', 0 10px 0 -5px #eee, 0 10px 1px -4px rgba(0,0,0,0.15)';
  const thirdLayer = ', 0 20px 0 -10px #eee, 0 20px 1px -9px rgba(0,0,0,0.15)';

  const addLabel = `${intl.formatMessage(messages.add)} ${objectSchema.title}`;

  return (
    <div className="objectlist-widget">
      <FormFieldWrapper {...props} noForInFieldLabel className="objectlist">
        {!fixedItems && (
          <div className="add-item-button-wrapper">
            <Button
              compact
              icon
              disabled={atMax}
              aria-label={objectSchema.addMessage || addLabel}
              onClick={(e) => {
                e.preventDefault();
                if (isTable) {
                  openAdd();
                  return;
                }
                const dataWithDefaults = buildItem(newItem());

                onChange(id, [...value, dataWithDefaults]);
                setActiveObject(value.length);
              }}
            >
              <Icon name={addSVG} size="18px" />
              &nbsp;
              {/* Custom addMessage in schema, else default to English */}
              {objectSchema.addMessage || addLabel}
            </Button>
          </div>
        )}
        {value.length === 0 && (
          <input
            aria-labelledby={`fieldset-${
              fieldSet || 'default'
            }-field-label-${id}`}
            type="hidden"
            value={intl.formatMessage(messages.emptyObjectList)}
          />
        )}
      </FormFieldWrapper>
      {isTable ? (
        <div
          ref={tableRef}
          className={`objectlist-table${narrow ? ' narrow' : ''}`}
        >
          <div
            className="objectlist-table-head"
            aria-hidden={narrow ? 'true' : undefined}
          >
            {columnNames.map((name) => (
              <span key={name} className="objectlist-table-heading">
                {objectSchema.properties?.[name]?.title || name}
              </span>
            ))}
          </div>
          <DragDropList
            forwardedAriaLabelledBy={`fieldset-${
              fieldSet || 'default'
            }-field-label-${id}`}
            childList={value.map((o, index) => [childIdOf(o, index), o])}
            onMoveItem={(result) => {
              const { source, destination } = result;
              if (!destination) {
                return;
              }
              const newValue = reorderArray(
                value,
                source.index,
                destination.index,
              );
              onChange(id, newValue);
              return true;
            }}
          >
            {({ child, index, draginfo }) => {
              const rowError = internalErrors[index];
              const menuOpen = menuIndex === index;
              return (
                <div
                  ref={draginfo.innerRef}
                  {...draginfo.draggableProps}
                  className="objectlist-table-item"
                  data-index={index}
                >
                  <div
                    className={`objectlist-table-row${rowError ? ' has-error' : ''}`}
                  >
                    <button
                      type="button"
                      style={{
                        visibility: 'visible',
                        display: 'inline-block',
                      }}
                      {...draginfo.dragHandleProps}
                      className="drag handle"
                    >
                      <Icon name={dragSVG} size="18px" />
                    </button>
                    {columnNames.map((name) => (
                      <div
                        key={name}
                        className="objectlist-table-cell"
                        data-column={name}
                      >
                        {cellValue(name, child)}
                      </div>
                    ))}
                    <div className="objectlist-table-actions">
                      <Button
                        compact
                        basic
                        type="button"
                        aria-label={`${intl.formatMessage(messages.edit)} ${itemName(child, index)} #${index + 1}`}
                        onClick={(e) => {
                          e.preventDefault();
                          openEdit(index);
                        }}
                      >
                        {intl.formatMessage(messages.edit)}
                      </Button>
                      <button
                        type="button"
                        aria-haspopup="menu"
                        aria-expanded={menuOpen}
                        aria-label={`${intl.formatMessage(messages.actions)} #${index + 1}`}
                        onClick={() => setMenuIndex(menuOpen ? null : index)}
                      >
                        ⋯
                      </button>
                    </div>
                  </div>
                  {/* The menu is in the flow below its row, not positioned over
                      the content, so no stacking context can cover it. */}
                  {menuOpen && (
                    <ul role="menu" className="objectlist-item-menu-list">
                      <li>
                        <button
                          type="button"
                          role="menuitem"
                          disabled={index === 0}
                          onClick={() => moveItem(index, index - 1)}
                        >
                          {intl.formatMessage(messages.moveUp)}
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          role="menuitem"
                          disabled={index === value.length - 1}
                          onClick={() => moveItem(index, index + 1)}
                        >
                          {intl.formatMessage(messages.moveDown)}
                        </button>
                      </li>
                      {!fixedItems && (
                        <li>
                          <button
                            type="button"
                            role="menuitem"
                            disabled={atMax}
                            onClick={() => duplicateItem(index)}
                          >
                            {intl.formatMessage(messages.duplicate)}
                          </button>
                        </li>
                      )}
                      {!fixedItems && (
                        <li>
                          <button
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              setMenuIndex(null);
                              setRemoveIndex(index);
                            }}
                          >
                            {intl.formatMessage(messages.remove)}
                          </button>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
              );
            }}
          </DragDropList>
          <Confirm
            open={removeIndex !== null}
            content={intl.formatMessage(messages.removeConfirm)}
            cancelButton={intl.formatMessage(messages.cancel)}
            confirmButton={intl.formatMessage(messages.remove)}
            onCancel={() => setRemoveIndex(null)}
            onConfirm={() => {
              onChange(
                id,
                value.filter((v, i) => i !== removeIndex),
              );
              setRemoveIndex(null);
            }}
          />
          {dialog && (
            // A submit inside the dialog is rendered in a portal, which
            // bubbles to the content form. It stops here.
            <div onSubmit={(e) => e.stopPropagation()}>
              <ModalForm
                open
                title={
                  dialog.index === null
                    ? addLabel
                    : `${objectSchema.title} #${dialog.index + 1}`
                }
                schema={dialog.schema}
                formData={dialog.draft}
                submitError={dialogError}
                onCancel={closeDialog}
                onSubmit={saveDialog}
              />
            </div>
          )}
        </div>
      ) : (
        <DragDropList
          style={{
            boxShadow: `${topLayerShadow}${value.length > 1 ? secondLayer : ''}${
              value.length > 2 ? thirdLayer : ''
            }`,
          }}
          forwardedAriaLabelledBy={`fieldset-${
            fieldSet || 'default'
          }-field-label-${id}`}
          childList={value.map((o, index) => [childIdOf(o, index), o])}
          onMoveItem={(result) => {
            const { source, destination } = result;
            if (!destination) {
              return;
            }
            const newValue = reorderArray(
              value,
              source.index,
              destination.index,
            );
            onChange(id, newValue);
            return true;
          }}
        >
          {({ child, childId, index, draginfo }) => {
            const hasError = Boolean(internalErrors[index]);
            return (
              <div
                ref={draginfo.innerRef}
                {...draginfo.draggableProps}
                key={childId}
              >
                <Accordion key={index} fluid styled>
                  <Accordion.Title
                    active={activeObject === index}
                    index={index}
                    onClick={handleChangeActiveObject}
                    className={hasError ? 'has-error' : undefined}
                    aria-label={`${
                      activeObject === index
                        ? intl.formatMessage(messages.labelCollapseItem)
                        : intl.formatMessage(messages.labelShowItem)
                    } #${index + 1}`}
                  >
                    <button
                      style={{
                        visibility: 'visible',
                        display: 'inline-block',
                      }}
                      {...draginfo.dragHandleProps}
                      className="drag handle"
                    >
                      <Icon name={dragSVG} size="18px" />
                    </button>

                    <div className="accordion-title-wrapper">
                      {`${itemName(child, index)} #${index + 1}`}
                    </div>
                    <div className="accordion-tools">
                      {!fixedItems && (
                        <button
                          aria-label={`${intl.formatMessage(
                            messages.labelRemoveItem,
                          )} #${index + 1}`}
                          onClick={() => {
                            onChange(
                              id,
                              value.filter((v, i) => i !== index),
                            );
                          }}
                        >
                          <Icon name={deleteSVG} size="20px" color="#e40166" />
                        </button>
                      )}
                      {activeObject === index ? (
                        <Icon name={upSVG} size="20px" />
                      ) : (
                        <Icon name={downSVG} size="20px" />
                      )}
                    </div>
                  </Accordion.Title>
                  <Accordion.Content active={activeObject === index}>
                    <Segment>
                      <ObjectWidget
                        id={`${id}-${index}`}
                        key={`ow-${id}-${index}`}
                        block={block}
                        schema={
                          schemaExtender
                            ? schemaExtender(objectSchema, child, intl)
                            : objectSchema
                        }
                        errors={internalErrors[index]}
                        value={child}
                        onChange={(fi, fv) => {
                          const newvalue = value.map((v, i) =>
                            i !== index ? v : fv,
                          );
                          onChange(id, newvalue);
                        }}
                      />
                    </Segment>
                  </Accordion.Content>
                </Accordion>
              </div>
            );
          }}
        </DragDropList>
      )}
    </div>
  );
};
export default ObjectListWidget;
