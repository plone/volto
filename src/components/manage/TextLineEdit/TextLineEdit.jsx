import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Editor, Node, Transforms, Range, createEditor } from 'slate';
import { ReactEditor, Editable, Slate, withReact } from 'slate-react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { usePrevious } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { P } from '@plone/volto-slate/constants';
import cx from 'classnames';

const messages = defineMessages({
  title: {
    id: 'Type the heading…',
    defaultMessage: 'Type the heading…',
  },
});

/**
 * A component for inserting an inline textline field for blocks
 */
export const TextLineEdit = (props) => {
  const {
    block,
    blockNode,
    data,
    detached,
    editable,
    index,
    metadata,
    onAddBlock,
    onChangeBlock,
    onChangeField,
    onFocusNextBlock,
    onFocusPreviousBlock,
    onSelectBlock,
    properties,
    selected,
    renderTag,
    renderClassName,
    fieldDataName,
    fieldName = 'title',
    placeholder,
  } = props;

  const [editor] = useState(withReact(createEditor()));
  const [initialValue] = useState([
    {
      type: P,
      children: [
        {
          text:
            data?.[fieldDataName] ||
            metadata?.[fieldName] ||
            properties?.[fieldName] ||
            '',
        },
      ],
    },
  ]);

  const intl = useIntl();

  const prevSelected = usePrevious(selected);

  const text = useMemo(
    () =>
      data?.[fieldDataName] ||
      metadata?.['title'] ||
      properties?.['title'] ||
      '',
    [data, fieldDataName, metadata, properties],
  );

  const resultantPlaceholder = useMemo(
    () =>
      placeholder || data.placeholder || intl.formatMessage(messages['title']),
    [placeholder, data.placeholder, intl],
  );
  const disableNewBlocks = useMemo(() => detached, [detached]);

  useEffect(() => {
    if (!prevSelected && selected) {
      if (editor.selection && Range.isCollapsed(editor.selection)) {
        // keep selection
        ReactEditor.focus(editor);
      } else {
        // nothing is selected, move focus to end
        ReactEditor.focus(editor);
        Transforms.select(editor, Editor.end(editor, []));
      }
    }
  }, [prevSelected, selected, editor]);

  useEffect(() => {
    // undo/redo handler
    const oldText = Node.string(editor);
    if (oldText !== text) {
      Transforms.insertText(editor, text, {
        at: [0, 0],
      });
    }
  }, [editor, text]);

  const handleChange = useCallback(() => {
    const newText = Node.string(editor);
    if (newText !== text) {
      if (fieldDataName) {
        onChangeBlock(block, {
          ...data,
          [fieldDataName]: newText,
        });
      } else {
        onChangeField(fieldName, newText);
      }
    }
  }, [
    data,
    block,
    editor,
    fieldDataName,
    fieldName,
    onChangeField,
    onChangeBlock,
    text,
  ]);

  const handleKeyDown = useCallback(
    (ev) => {
      if (ev.key === 'Return' || ev.key === 'Enter') {
        ev.preventDefault();
        if (!disableNewBlocks) {
          onSelectBlock(
            onAddBlock(config.settings.defaultBlockType, index + 1),
          );
        }
      } else if (ev.key === 'ArrowUp') {
        ev.preventDefault();
        onFocusPreviousBlock(block, blockNode.current);
      } else if (ev.key === 'ArrowDown') {
        ev.preventDefault();
        onFocusNextBlock(block, blockNode.current);
      }
    },
    [
      index,
      blockNode,
      disableNewBlocks,
      onSelectBlock,
      onAddBlock,
      onFocusPreviousBlock,
      onFocusNextBlock,
      block,
    ],
  );

  const handleFocus = useCallback(() => {
    onSelectBlock(block);
  }, [block, onSelectBlock]);

  const RenderTag = renderTag || 'h1';

  const renderElement = useCallback(
    ({ attributes, children }) => {
      return (
        <RenderTag {...attributes} className={cx(renderClassName)}>
          {children}
        </RenderTag>
      );
    },
    [renderClassName],
  );

  if (typeof window.__SERVER__ !== 'undefined') {
    return <div />;
  }
  return (
    <Slate editor={editor} onChange={handleChange} value={initialValue}>
      <Editable
        readOnly={!editable}
        onKeyDown={handleKeyDown}
        placeholder={resultantPlaceholder}
        renderElement={renderElement}
        onFocus={handleFocus}
        aria-multiline="false"
      ></Editable>
    </Slate>
  );
};

TextLineEdit.propTypes = {
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onChangeField: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onAddBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  editable: PropTypes.bool,
  detached: PropTypes.bool,
  blockNode: PropTypes.any,
  renderTag: PropTypes.string,
  renderClassName: PropTypes.string,
  fieldDataName: PropTypes.string,
};

TextLineEdit.defaultProps = {
  detached: false,
  editable: true,
};

export default TextLineEdit;
