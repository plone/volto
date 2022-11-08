/**
 * Edit title/description block.
 * @module volto-slate/blocks/Title/TitleBlockEdit
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Editor, Node, Transforms, Range, createEditor } from 'slate';
import { ReactEditor, Editable, Slate, withReact } from 'slate-react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import config from '@plone/volto/registry';
import { P } from '@plone/volto-slate/constants';
import cx from 'classnames';

const messages = defineMessages({
  description: {
    id: 'Add a description…',
    defaultMessage: 'Add a description…',
  },
});

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

/**
 * Edit title block component.
 * @class TitleBlockEdit
 * @extends Component
 */
export const TitleBlockEdit = (props) => {
  const {
    block,
    blockNode,
    data,
    detached,
    editable,
    index,
    metadata,
    onAddBlock,
    onChangeField,
    onDeleteBlock,
    onFocusNextBlock,
    onFocusPreviousBlock,
    onSelectBlock,
    properties,
    selected,
  } = props;

  const [editor] = useState(withReact(createEditor()));
  const [initialValue] = useState([
    {
      type: P,
      children: [
        {
          text: metadata?.['description'] || properties?.['description'] || '',
        },
      ],
    },
  ]);

  const intl = useIntl();

  const prevSelected = usePrevious(selected);

  const text = useMemo(
    () => metadata?.['description'] || properties?.['description'] || '',
    [metadata, properties],
  );

  const placeholder = useMemo(
    () => data.placeholder || intl.formatMessage(messages['description']),
    [data.placeholder, intl],
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
    // undo/redo handlerr
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
      onChangeField('description', newText);
    }
  }, [editor, onChangeField, text]);

  const handleKeyDown = useCallback(
    (ev) => {
      if (ev.key === 'Backspace' && Node.string(editor).length === 0) {
        ev.preventDefault();
        onDeleteBlock(block, true);
      } else if (ev.key === 'Return' || ev.key === 'Enter') {
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
      editor,
      onDeleteBlock,
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

  const renderElement = useCallback(({ attributes, children }) => {
    return (
      <div {...attributes} className="documentDescription">
        {children}
      </div>
    );
  }, []);

  if (typeof window.__SERVER__ !== 'undefined') {
    return <div />;
  }

  return (
    <Slate
      editor={editor}
      onChange={handleChange}
      value={initialValue}
      className={cx('block description', {
        selected: selected,
      })}
    >
      <Editable
        readOnly={!editable}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        renderElement={renderElement}
        onFocus={handleFocus}
        aria-multiline="false"
      ></Editable>
    </Slate>
  );
};

TitleBlockEdit.propTypes = {
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
};

TitleBlockEdit.defaultProps = {
  detached: false,
  editable: true,
};

export default TitleBlockEdit;
