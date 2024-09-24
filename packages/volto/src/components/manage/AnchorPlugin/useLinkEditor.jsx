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

function getPositionStyle(position) {
  return (
    position || {
      style: {
        opacity: 1,
        top: -5,
        left: 55,
      },
    }
  );
}

const useLinkEditor = () => {
  const [showLinkEditor, setShowLinkEditor] = React.useState(false);
  const show = React.useCallback(() => setShowLinkEditor(true), []);
  const anchorNode = React.useRef();

  const LinkEditor = React.useCallback(
    (props) => {
      const {
        id,
        value,
        onChange,
        placeholder,
        objectBrowserPickerType,
        position,
      } = props;
      return showLinkEditor && anchorNode.current ? (
        <PositionedToolbar
          className="add-link"
          toggleButton={anchorNode.current}
          position={getPositionStyle(position)}
        >
          <AddLinkForm
            placeholder={placeholder}
            data={{ url: value || '' }}
            theme={{}}
            objectBrowserPickerType={objectBrowserPickerType}
            onChangeValue={(url) => {
              setShowLinkEditor(false);
              onChange(id, url);
            }}
            onClear={() => {}}
            onOverrideContent={(c) => {
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
