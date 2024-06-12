/***
 * A hook that makes it easy to use the AddLinkForm link editing component.
 *
 * To use it, in your component, do something like:
 *
 * const linkEditor = useLinkEditor();
 *
 * return (<>
 * <button ref={linkEditor.anchorNode} onClick={() => linkEditor.show()}>btn</button>
 * {linkEditor.anchorNode && <linkEditor.LinkEditor value={value} id={id} onChange={onChange} />}
 * </>);
 *
 */

import React from 'react';
import { PositionedToolbar } from '@plone/volto-slate/editor/ui';
import AddLinkForm from '@plone/volto/components/manage/AnchorPlugin/components/LinkButton/AddLinkForm';

function getPositionStyle(el) {
  const rect = el.getBoundingClientRect();

  return {
    style: {
      opacity: 1,
      top: rect.top + window.pageYOffset - 6,
      left: rect.left + window.pageXOffset + rect.width / 2,
    },
  };
}

const useLinkEditor = () => {
  const [showLinkEditor, setShowLinkEditor] = React.useState(false);
  const show = React.useCallback(() => setShowLinkEditor(true), []);
  const savedPosition = React.useRef();
  const anchorNode = React.useRef();

  if (anchorNode.current && !savedPosition.current) {
    savedPosition.current = getPositionStyle(anchorNode.current);
  }

  const LinkEditor = React.useCallback(
    (props) => {
      const { id, value, onChange, placeholder, objectBrowserPickerType } =
        props;
      return showLinkEditor && anchorNode.current && savedPosition.current ? (
        <PositionedToolbar
          className="add-link"
          position={savedPosition.current}
        >
          <AddLinkForm
            placeholder={placeholder}
            data={{ url: value || '' }}
            theme={{}}
            objectBrowserPickerType={objectBrowserPickerType}
            onChangeValue={(url) => {
              savedPosition.current = null;
              setShowLinkEditor(false);
              onChange(id, url);
            }}
            onClear={() => {}}
            onOverrideContent={(c) => {
              savedPosition.current = null;
              setShowLinkEditor(false);
            }}
          />
        </PositionedToolbar>
      ) : null;
    },
    [showLinkEditor],
  );

  return {
    anchorNode,
    show,
    LinkEditor,
  };
};

export default useLinkEditor;
