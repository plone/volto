import cx from 'classnames';
import React, { useRef, useEffect } from 'react';
import { Portal } from 'react-portal';
import { useSlate } from 'slate-react';
import Separator from './Separator';
import BasicToolbar from './BasicToolbar';
import { Editor, Node } from 'slate';
import { ReactEditor } from 'slate-react';

const Toolbar = ({
  elementType,
  enableExpando = false,
  toggleButton,
  className,
  children,
  show = true,
}) => {
  const ref = useRef();
  const editor = useSlate();

  useEffect(() => {
    const domNode = ref.current;
    let rect = { width: 1, top: 0, left: 0 };

    if ((children || []).length === 0) {
      domNode.removeAttribute('style');
      return;
    }

    if (!show) {
      domNode.removeAttribute('style');
      return;
    }

    const { selection } = editor;
    // const savedSelection = editor.getSavedSelection();
    if (!selection) {
      domNode.removeAttribute('style');
      return;
    }

    if (editor.isSidebarOpen) {
      domNode.removeAttribute('style');
      return;
    }

    if (elementType) {
      const [element] = Editor.nodes(editor, {
        at: editor.selection || editor.getSavedSelection(),
        match: (n) => n.type === elementType,
      });

      if (!element) {
        domNode.removeAttribute('style');
        return;
      }

      const [node] = element;
      const domEl = ReactEditor.toDOMNode(editor, node);

      rect = domEl.getBoundingClientRect();
    } else {
      // TODO: should we fallback to editor.getSelection()?
      // TODO: test with third party plugins
      const slateNode = Node.get(editor, selection.anchor.path);
      try {
        const domEl = ReactEditor.toDOMNode(editor, slateNode);
        rect = domEl.getBoundingClientRect();
      } catch {
        // ignoring error here is safe, editor is out of sync and the selection
        // is actually none, so no toolbar should be shown
      }
    }

    domNode.style.opacity = 1;
    domNode.style.top = `${
      rect.top + window.pageYOffset - domNode.offsetHeight - 6
    }px`;
    domNode.style.left = `${Math.max(
      rect.left + window.pageXOffset - domNode.offsetWidth / 2 + rect.width / 2,
      0, // if the left edge of the toolbar should be otherwise offscreen
    )}px`;
  });

  return (
    <Portal>
      <BasicToolbar
        className={cx('slate-inline-toolbar', { [className]: className })}
        ref={ref}
      >
        {children}
        {enableExpando && toggleButton && (
          <>
            <Separator />
            {toggleButton}
          </>
        )}
      </BasicToolbar>
    </Portal>
  );
};

export default Toolbar;
