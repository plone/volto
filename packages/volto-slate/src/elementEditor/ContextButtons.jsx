import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl'; // , defineMessages

import clearSVG from '@plone/volto/icons/delete.svg';

import ToolbarButton from '@plone/volto-slate/editor/ui/ToolbarButton';
import { setPluginOptions } from '@plone/volto-slate/actions/plugins';

/*
 * Note: this is a weirder component, it should be called as a native function
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default (options) => (editor) => {
  const {
    isActiveElement,
    unwrapElement,
    pluginId,
    messages,
    toolbarButtonIcon,
  } = options;
  const intl = useIntl();
  const dispatch = useDispatch();
  const pid = `${editor.uid}-${pluginId}`;
  const showEditor = useSelector(
    (state) => state['slate_plugins']?.[pid]?.show_sidebar_editor,
  );

  return isActiveElement(editor) ? (
    <React.Fragment key={pluginId}>
      <ToolbarButton
        title={intl.formatMessage(messages.edit)}
        icon={toolbarButtonIcon}
        active={showEditor}
        aria-label={intl.formatMessage(messages.edit)}
        onMouseDown={() => {
          dispatch(
            setPluginOptions(pid, {
              show_sidebar_editor: true,
            }),
          );
        }}
      />
      <ToolbarButton
        title={intl.formatMessage(messages.delete)}
        icon={clearSVG}
        aria-label={intl.formatMessage(messages.delete)}
        alt={intl.formatMessage(messages.delete)}
        onMouseDown={() => {
          unwrapElement(editor);
        }}
      />
    </React.Fragment>
  ) : (
    ''
  );
};
