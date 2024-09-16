import { castArray, map } from 'lodash-es';
import { Editor, Path, Point, Range, Transforms } from 'slate';

/**
 * Get range from {@link getPointBefore} to the end point of `at`.
 */
export const getRangeBefore = (editor, at, options) => {
  const anchor = getPointBefore(editor, at, options);
  if (!anchor) return;

  const focus = Editor.point(editor, at, { edge: 'end' });

  return {
    anchor,
    focus,
  };
};

/**
 * Autoformat in the middle of a block
 */
export const autoformatInlineBlock = (
  editor,
  { type, markup, preFormat, format },
) => {
  const markupRange = getRangeBefore(editor, editor.selection, {
    matchString: markup,
    skipInvalid: true,
  });

  if (markupRange) {
    autoformatBlock(editor, type, markupRange, {
      preFormat: () => {
        editor.insertBreak();
        if (preFormat) {
          preFormat(editor);
        }
      },
      format,
    });

    return true;
  }
};

/**
 * {@link Editor.before} with additional options.
 * TODO: support for sequence of any characters.
 */
export const getPointBefore = (editor, at, options) => {
  if (!options || (!options.match && !options.matchString)) {
    return Editor.before(editor, at, options);
  }

  let beforeAt = at;
  let previousBeforePoint = Editor.point(editor, at, { edge: 'end' });

  const stackLength = (options.matchString?.length || 0) + 1;
  const stack = Array(stackLength);

  const unitOffset = !options.unit || options.unit === 'offset';

  let count = 0;
  while (true) {
    const beforePoint = Editor.before(editor, beforeAt, options);

    // not found
    if (!beforePoint) return;

    // different path
    if (
      !options.multiPaths &&
      !Path.equals(beforePoint.path, previousBeforePoint.path)
    ) {
      return;
    }

    const beforeString = Editor.string(editor, {
      anchor: beforePoint,
      focus: previousBeforePoint,
    });

    const matchString = castArray(options.matchString);

    let beforeStringToMatch = beforeString;

    if (unitOffset && stackLength) {
      stack.unshift({
        point: beforePoint,
        text: beforeString,
      });
      stack.pop();

      beforeStringToMatch = map(stack.slice(0, -1), 'text').join('');
    }

    if (
      matchString.includes(beforeStringToMatch) ||
      options.match?.({ beforeString: beforeStringToMatch, beforePoint, at })
    ) {
      if (options.afterMatch) {
        if (stackLength && unitOffset) {
          return stack[stack.length - 1]?.point;
        }
        return previousBeforePoint;
      }
      return beforePoint;
    }

    previousBeforePoint = beforePoint;
    beforeAt = beforePoint;

    count += 1;

    if (!options.skipInvalid) {
      if (!matchString || count > matchString.length) return;
    }
  }
};

export const autoformatInline = (
  editor,
  { type, between, markup, ignoreTrim },
) => {
  const selection = editor.selection;

  const startMarkup = between ? between[0] : markup;
  const endMarkup = between ? between[1] : '';

  let endMarkupPointBefore = selection.anchor;
  if (endMarkup) {
    endMarkupPointBefore = getPointBefore(editor, selection, {
      matchString: endMarkup,
    });
    if (!endMarkupPointBefore) return false;
  }

  const startMarkupPointAfter = getPointBefore(editor, endMarkupPointBefore, {
    matchString: startMarkup,
    skipInvalid: true,
    afterMatch: true,
  });

  if (!startMarkupPointAfter) return false;

  // found

  const markupRange = {
    anchor: startMarkupPointAfter,
    focus: endMarkupPointBefore,
  };

  if (!ignoreTrim) {
    const markupText = getText(editor, markupRange);
    if (markupText.trim() !== markupText) return false;
  }

  // delete end markup
  if (endMarkup) {
    endMarkupPointBefore = getPointBefore(editor, selection, {
      matchString: endMarkup,
    });
    Transforms.delete(editor, {
      at: {
        anchor: endMarkupPointBefore,
        focus: selection.anchor,
      },
    });
  }

  // add mark to the text between the markups
  Transforms.select(editor, markupRange);
  Transforms.wrapNodes(editor, { type, children: [] }, { split: true });
  Transforms.collapse(editor, { edge: 'end' });

  // delete start markup
  const startMarkupPointBefore = getPointBefore(editor, selection, {
    matchString: startMarkup,
    skipInvalid: true,
  });
  Transforms.delete(editor, {
    at: {
      anchor: startMarkupPointBefore,
      focus: startMarkupPointAfter,
    },
  });

  return true;
};

export const autoformatBlock = (editor, type, at, { preFormat, format }) => {
  Transforms.delete(editor, { at });

  if (preFormat) {
    preFormat(editor);
  }

  if (!format) {
    Transforms.setNodes(
      editor,
      { type },
      { at },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  } else {
    format(editor);
  }
};

/**
 * See {@link Range.isCollapsed}.
 * Return false if `range` is not defined.
 */
export const isCollapsed = (range) => !!range && Range.isCollapsed(range);

/**
 * See {@link Editor.string}.
 * If `at` is not defined, return an empty string.
 */
export const getText = (editor, at) => (at && Editor.string(editor, at)) ?? '';

/**
 * Get the bloc {
 * k above a location (default: selection).
 * If not found, return the editor entry.
 */
export const getBlockAbove = (editor, options = {}) =>
  Editor.above(editor, {
    match: (n) => Editor.isBlock(editor, n),
    ...options,
  }) || [editor, []];

/**
 * Get the point from a location (default: selection).
 * If the location is a range, get the anchor point.
 * If the location is a path, get the point at this path with offset 0.
 * If `focus` is true, get the focus point.
 */
export const getPointFromLocation = (
  editor,
  { at = editor.selection, focus } = {},
) => {
  let point;
  if (Range.isRange(at)) point = !focus ? at.anchor : at.focus;
  if (Point.isPoint(at)) point = at;
  if (Path.isPath(at)) point = { path: at, offset: 0 };

  return point;
};

/**
 * Get the range from the start of the block above a location (default: selection) to the location.
 */
export const getRangeFromBlockStart = (editor, options = {}) => {
  const [, path] = getBlockAbove(editor, options);

  const start = Editor.start(editor, path);

  const focus = getPointFromLocation(editor, options);

  if (!focus) return;

  return { anchor: start, focus };
};

/**
 * Enables support for autoformatting actions.
 * Once a markup rule is validated, it does not check the following rules.
 */
export const withAutoformat =
  ({ rules }) =>
  (editor) => {
    const { insertText } = editor;

    editor.insertText = (text) => {
      if (!isCollapsed(editor.selection)) return insertText(text);

      for (const {
        trigger = ' ',
        type,
        markup,
        preFormat,
        format,
        mode,
        between,
        ignoreTrim,
        insertTrigger,
      } of rules) {
        const triggers = castArray(trigger);

        // Check trigger
        if (!triggers.includes(text)) continue;

        const markups = castArray(markup);

        const rangeFromBlockStart = getRangeFromBlockStart(editor);
        const textFromBlockStart = getText(editor, rangeFromBlockStart);

        const valid = () => insertTrigger && insertText(text);

        if (markups.includes(textFromBlockStart)) {
          // Start of the block
          autoformatBlock(editor, type, rangeFromBlockStart, {
            preFormat,
            format,
          });
          return valid();
        }

        if (mode === 'inline-block') {
          if (
            autoformatInlineBlock(editor, { preFormat, markup, format, type })
          ) {
            return valid();
          }
        }

        if (mode === 'inline') {
          if (
            autoformatInline(editor, {
              type,
              between,
              ignoreTrim,
              markup: Array.isArray(markup) ? markup[0] : markup,
            })
          ) {
            return valid();
          }
        }
      }

      insertText(text);
    };

    return editor;
  };
