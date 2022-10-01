import React from 'react';
import { Editor, Transforms, Range, Text } from 'slate';

export function isMarkActive(editor, format) {
  // TODO: this implementation is not ok. LibreOffice Writer only shows
  // mark button as active if the mark is applied to the entire selected range
  // Here, it seems, the mark doesn't need to cover the entire selection,
  // which is wrong
  let marks;
  try {
    marks = Editor.marks(editor);
  } catch (ex) {
    // bug in Slate, recently appears only in Cypress context, more exactly when I press Enter inside a numbered list first item to produce a split (resulting two list items) (not sure if manually inside the Cypress browser but automatically it surely appears)
    // if (
    //   ex.message ===
    //   'Cannot get the leaf node at path [0,0] because it refers to a non-leaf node: [object Object]' // also with [0,1]
    // ) {
    marks = null;
    // } else {
    //   throw ex;
    // }
  }
  return marks ? marks[format] === true : false;
}

function addMark(editor, key, value) {
  const { selection } = editor;

  if (selection) {
    if (Range.isExpanded(selection)) {
      Transforms.setNodes(
        editor,
        { [key]: value },
        {
          match: (node) => {
            // console.log('node', node);
            return Text.isText(node) || editor.isVoid(node);
          },
          split: true,
        },
      );
    } else {
      const marks = {
        ...(Editor.marks(editor) || {}),
        [key]: value,
      };

      editor.marks = marks;
      editor.onChange();
    }
  }
}

export function toggleMark(editor, format) {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    // don't apply marks inside inlines (such as footnote) because
    // that splits the footnote into multiple footnotes
    addMark(editor, format, true);
    // if (isSelectionInline(editor)) {
    //   addMark(editor, format, true);
    // }
  }
}

/*
 * Replaces inline text elements with a wrapper result:
 *
 * Leaves are wrapped and non-leaves are cloned. Empty leaves are removed.
 */
export function wrapInlineMarkupText(children, wrapper) {
  if (typeof children === 'string') {
    return children ? wrapper(children) : null;
  }

  // TODO: find the deepest child that needs to be replaced.
  // TODO: note: this might trigger warnings about keys
  if (Array.isArray(children)) {
    return children
      .map((child) => {
        if (typeof child === 'string' && child.length >= 1) {
          return wrapper(children);
        }
        if (typeof child === 'string' && child.length === 0) {
          return null;
        }
        return React.cloneElement(
          child,
          child.props,
          wrapInlineMarkupText(child.props.children, wrapper),
        );
      })
      .filter((child) => !!child);
  }

  return React.cloneElement(
    children,
    children.props,
    wrapInlineMarkupText(children.props.children, wrapper),
  );
}
