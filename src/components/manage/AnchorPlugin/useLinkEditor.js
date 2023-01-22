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

const useLinkEditor = (id, value, api) => {
  const [showLinkEditor, setShowLinkEditor] = React.useState(false);
  const show = React.useCallback(() => setShowLinkEditor(true), []);
  const savedPosition = React.useRef();
  const anchorNode = React.useRef();

  if (anchorNode.current && !savedPosition.current) {
    savedPosition.current = getPositionStyle(anchorNode.current);
  }
  // useWhyDidYouUpdate('useLinkEditor', { showLinkEditor, value, api });

  const LinkEditor = React.useCallback(
    (props) => {
      return showLinkEditor && anchorNode.current && savedPosition.current ? (
        <PositionedToolbar
          className="add-link"
          position={savedPosition.current}
        >
          <AddLinkForm
            block="draft-js"
            placeholder={'Add link'}
            data={{ url: value || '' }}
            theme={{}}
            onChangeValue={(url) => {
              savedPosition.current = null;
              setShowLinkEditor(false);
              api.current.onChange(id, url);
            }}
            onClear={() => {
              // clear button was pressed in the link edit popup
              api.current.onChange(id, null);
            }}
            onOverrideContent={(c) => {
              savedPosition.current = null;
              setShowLinkEditor(false);
            }}
          />
        </PositionedToolbar>
      ) : null;
    },
    [showLinkEditor, value, api, id],
  );

  return {
    anchorNode,
    show,
    LinkEditor,
  };
};

export default useLinkEditor;
