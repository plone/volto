import React from 'react'; // , useState
import SlateToolbar from './SlateToolbar';
import SlateContextToolbar from './SlateContextToolbar';
import config from '@plone/volto/registry';
import { hasRangeSelection } from '@plone/volto-slate/utils';
import { ReactEditor } from 'slate-react';
import cx from 'classnames';

/**
 * The main Slate toolbar. All the others are just wrappers, UI or used here
 */
const InlineToolbar = (props) => {
  const {
    editor,
    className,
    showExpandedToolbar,
    setShowExpandedToolbar,
  } = props;

  const slate = props.slateSettings || config.settings.slate;

  const [showMainToolbar, setShowMainToolbar] = React.useState(
    !!(editor.selection && hasRangeSelection(editor)),
  );

  React.useEffect(() => {
    let el;
    try {
      el = ReactEditor.toDOMNode(editor, editor);
    } catch {
      return;
    }
    const toggleToolbar = () => {
      const selection = window.getSelection();
      const { activeElement } = window.document;
      if (activeElement !== el) return;
      if (!selection.isCollapsed && !showMainToolbar) {
        setShowMainToolbar(true);
      } else if (selection.isCollapsed && showMainToolbar) {
        setShowMainToolbar(false);
      }
    };
    window.document.addEventListener('selectionchange', toggleToolbar);
    return () => document.removeEventListener('selectionchange', toggleToolbar);
  }, [editor, showMainToolbar]);

  const showContextToolbar =
    slate.contextToolbarButtons.map((plug) => plug(editor)).filter((c) => !!c)
      .length > 0;

  return (
    <>
      <SlateToolbar
        className={cx(className, {
          upper: showContextToolbar,
        })}
        selected={true}
        enableExpando={slate.enableExpandedToolbar}
        showExpandedToolbar={showExpandedToolbar}
        setShowExpandedToolbar={setShowExpandedToolbar}
        show={showMainToolbar}
        slateSettings={slate}
      />
      <SlateContextToolbar
        editor={editor}
        plugins={slate.contextToolbarButtons}
        show={showContextToolbar}
      />
    </>
  );
};

export default InlineToolbar;
