import React from 'react';
import { defineMessages } from 'react-intl'; // , defineMessages
import { ReactEditor, useSlate } from 'slate-react';
import { useSelector, useDispatch } from 'react-redux';
import AddLinkForm from '@plone/volto/components/manage/AnchorPlugin/components/LinkButton/AddLinkForm';
import {
  _insertElement,
  _unwrapElement,
  _isActiveElement,
  _getActiveElement,
} from 'volto-slate/components/ElementEditor/utils';
import { SIMPLELINK, LINK } from 'volto-slate/constants';
import { LinkElement } from './render';
import { simpleLinkDeserializer, withSimpleLink } from './extensions';
import { setPluginOptions } from 'volto-slate/actions';
import {
  ToolbarButton as UIToolbarButton,
  PositionedToolbar,
} from 'volto-slate/editor/ui';

import linkSVG from '@plone/volto/icons/link.svg';
import unlinkSVG from '@plone/volto/icons/unlink.svg';

const messages = defineMessages({
  add: {
    id: 'Add link',
    defaultMessage: 'Add link',
  },
  edit: {
    id: 'Edit link',
    defaultMessage: 'Edit link',
  },
});

function getPositionStyle() {
  const domSelection = window.getSelection();
  if (domSelection.rangeCount < 1) {
    return {};
  }
  const domRange = domSelection.getRangeAt(0);
  const rect = domRange.getBoundingClientRect();

  return {
    style: {
      opacity: 1,
      top: rect.top + window.pageYOffset - 6,
      left: rect.left + window.pageXOffset + rect.width / 2,
    },
  };
}

const SimpleLinkEditor = (props) => {
  const {
    editor,
    pluginId,
    getActiveElement,
    unwrapElement,
    insertElement,
  } = props;
  const pid = `${editor.uid}-${pluginId}`;
  const showEditor = useSelector((state) => {
    return state['slate_plugins']?.[pid]?.show_sidebar_editor;
  });
  const savedPosition = React.useRef();

  const dispatch = useDispatch();

  const active = getActiveElement(editor);
  const [node] = active || [];

  if (showEditor && !savedPosition.current) {
    savedPosition.current = getPositionStyle();
  }

  return showEditor ? (
    <PositionedToolbar className="add-link" position={savedPosition.current}>
      <AddLinkForm
        block="draft-js"
        placeholder={'Add link'}
        data={{ url: node?.data?.url || '' }}
        theme={{}}
        onChangeValue={(url) => {
          if (!active) {
            if (!editor.selection) editor.selection = editor.savedSelection;
            insertElement(editor, { url });
          } else {
            const selection = unwrapElement(editor);
            editor.selection = selection;
            insertElement(editor, { url });
          }
          ReactEditor.focus(editor);
          dispatch(setPluginOptions(pid, { show_sidebar_editor: false }));
          savedPosition.current = null;
        }}
        onClear={() => {
          // clear button was pressed in the link edit popup
          const newSelection = JSON.parse(
            JSON.stringify(unwrapElement(editor)),
          );
          editor.selection = newSelection;
          editor.savedSelection = newSelection;
        }}
        onOverrideContent={(c) => {
          dispatch(setPluginOptions(pid, { show_sidebar_editor: false }));
          savedPosition.current = null;
        }}
      />
    </PositionedToolbar>
  ) : (
    ''
  );
};

export default (config) => {
  const { slate } = config.settings;

  const PLUGINID = SIMPLELINK;

  const linkBtnIndex = slate.toolbarButtons.findIndex((b) => b === LINK);
  slate.expandedToolbarButtons = slate.expandedToolbarButtons.filter(
    (b) => b !== LINK,
  );

  const insertElement = _insertElement(PLUGINID);
  const getActiveElement = _getActiveElement(PLUGINID);
  const isActiveElement = _isActiveElement(PLUGINID);
  const unwrapElement = _unwrapElement(PLUGINID);

  const ToolbarButton = (props) => {
    const dispatch = useDispatch();
    const editor = useSlate();
    const isElement = isActiveElement(editor);

    return (
      <UIToolbarButton
        title={isElement ? messages.edit : messages.add}
        icon={isElement ? unlinkSVG : linkSVG}
        active={isElement}
        onMouseDown={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const pid = `${editor.uid}-${PLUGINID}`;
          editor.savedSelection = JSON.parse(JSON.stringify(editor.selection));
          dispatch(setPluginOptions(pid, { show_sidebar_editor: true }));
        }}
      />
    );
  };

  const pluginOptions = {
    insertElement,
    getActiveElement,
    isActiveElement,
    unwrapElement,
  };

  slate.buttons[PLUGINID] = ToolbarButton;
  slate.toolbarButtons[linkBtnIndex] = PLUGINID;
  slate.htmlTagsToSlate.A = simpleLinkDeserializer;
  slate.extensions.push(withSimpleLink);
  slate.elements[PLUGINID] = LinkElement;
  slate.nodeTypesToHighlight.push(PLUGINID);
  slate.persistentHelpers.push((props) => (
    <SimpleLinkEditor {...props} pluginId={PLUGINID} {...pluginOptions} />
  ));

  return config;
};
