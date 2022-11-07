import { Editor, Transforms, Node } from 'slate';

/**
 * @description Creates or updates an existing $elementType. It also takes care
 * of the saved selection and uses PathRef.
 *
 * @param {Editor} editor The Slate editor for the context
 * @param {object} data Relevant data for this element
 *
 * @returns {boolean} true if an element was possibly inserted, false otherwise
 * (currently we do not check here if the element was already applied to the
 * editor)
 */
export const _insertElement = (elementType) => (editor, data) => {
  if (editor.getSavedSelection()) {
    const selection = editor.selection || editor.getSavedSelection();

    const rangeRef = Editor.rangeRef(editor, selection);

    const res = Array.from(
      Editor.nodes(editor, {
        match: (n) => n.type === elementType,
        mode: 'highest',
        at: selection,
      }),
    );

    if (res.length) {
      const [, path] = res[0];
      Transforms.setNodes(
        editor,
        { data },
        {
          at: path ? path : null,
          match: path ? (n) => n.type === elementType : null,
        },
      );
    } else {
      Transforms.wrapNodes(
        editor,
        { type: elementType, data },
        {
          split: true,
          at: selection,
          match: (node) => {
            return Node.string(node).length !== 0;
          },
        }, //,
      );
    }

    const sel = JSON.parse(JSON.stringify(rangeRef.current));
    Transforms.select(editor, sel);
    editor.setSavedSelection(sel);

    return true;
  }

  return false;
};

/**
 * Will unwrap a node that has as type the one received or one from an array.
 * It identifies the current target element and expands the selection to it, in
 * case the selection was just partial. This allows a "clear and reassign"
 * operation, for example for the Link plugin.
 *
 * @param {string|Object[]} elementType - this can be a string or an array of strings
 * @returns {Object|null} - current node
 */
export const _unwrapElement = (elementType) => (editor) => {
  const [link] = Editor.nodes(editor, {
    at: editor.selection,
    match: (node) => node?.type === elementType,
  });
  const [, path] = link;
  const [start, end] = Editor.edges(editor, path);
  const range = { anchor: start, focus: end };

  const ref = Editor.rangeRef(editor, range);

  Transforms.select(editor, range);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      Array.isArray(elementType)
        ? elementType.includes(n.type)
        : n.type === elementType,
    at: range,
  });

  const current = ref.current;
  ref.unref();

  return current;
};

export const _isActiveElement = (elementType) => (editor) => {
  const selection = editor.selection || editor.getSavedSelection();
  let found;
  try {
    found = Array.from(
      Editor.nodes(editor, {
        match: (n) => n.type === elementType,
        at: selection,
      }) || [],
    );
  } catch (e) {
    // eslint-disable-next-line
    // console.warn('Error in finding active element', e);
    return false;
  }
  if (found.length) return true;

  if (selection) {
    const { path } = selection.anchor;
    const isAtStart =
      selection.anchor.offset === 0 && selection.focus.offset === 0;

    if (isAtStart) {
      try {
        found = Editor.previous(editor, {
          at: path,
          // match: (n) => n.type === MENTION,
        });
      } catch (ex) {
        found = [];
      }
      if (found && found[0] && found[0].type === elementType) {
        return true;
      }
    }
  }

  return false;
};

/**
 * Will look for a node that has as type the one received or one from an array
 * @param {string|Object[]} elementType - this can be a string or an array of strings
 * @returns {Object|null} - found node
 */
export const _getActiveElement = (elementType) => (
  editor,
  direction = 'any',
) => {
  const selection = editor.selection || editor.getSavedSelection();
  let found = [];

  try {
    found = Array.from(
      Editor.nodes(editor, {
        match: (n) =>
          Array.isArray(elementType)
            ? elementType.includes(n.type)
            : n.type === elementType,
        at: selection,
      }),
    );
  } catch (e) {
    return null;
  }

  if (found.length) return found[0];

  if (!selection) return null;

  if (direction === 'any' || direction === 'backward') {
    const { path } = selection.anchor;
    const isAtStart =
      selection.anchor.offset === 0 && selection.focus.offset === 0;

    if (isAtStart) {
      let found;
      try {
        found = Editor.previous(editor, {
          at: path,
        });
      } catch (ex) {
        // eslint-disable-next-line no-console
        console.warn('Unable to find previous node', editor, path);
        return;
      }
      if (found && found[0] && found[0].type === elementType) {
        if (
          (Array.isArray(elementType) && elementType.includes(found[0].type)) ||
          found[0].type === elementType
        ) {
          return found;
        }
      } else {
        return null;
      }
    }
  }

  if (direction === 'any' || direction === 'forward') {
    const { path } = selection.anchor;
    const isAtStart =
      selection.anchor.offset === 0 && selection.focus.offset === 0;

    if (isAtStart) {
      let found;
      try {
        found = Editor.next(editor, {
          at: path,
        });
      } catch (e) {
        // eslint-disable-next-line
        console.warn('Unable to find next node', editor, path);
        return;
      }
      if (found && found[0] && found[0].type === elementType) {
        if (
          (Array.isArray(elementType) && elementType.includes(found[0].type)) ||
          found[0].type === elementType
        ) {
          return found;
        }
      } else {
        return null;
      }
    }
  }

  return null;
};
