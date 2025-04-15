/**
 * A small wrapper around PluginEditor. Its purpose it to allow for clearer
 * code, otherwise it would mix too many hooks and it's not possible to render
 * a variable number of hooks in a component
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarPopup from '@plone/volto/components/manage/Sidebar/SidebarPopup';
import { setPluginOptions } from '@plone/volto-slate/actions/plugins';

const SidebarEditor = (props) => {
  const { editor, pluginId, getActiveElement, pluginEditor } = props;
  const pid = `${editor.uid}-${pluginId}`;
  const PluginEditor = pluginEditor;
  const showEditor = useSelector((state) => {
    return state['slate_plugins']?.[pid]?.show_sidebar_editor;
  });

  const dispatch = useDispatch();

  let active;
  try {
    active = getActiveElement(editor);
  } catch (error) {
    // eslint-disable-next-line
    console.warn('Error in getting active element', error);
  }

  // Hide the editor when switching to another text element
  React.useEffect(() => {
    if (!active)
      dispatch(setPluginOptions(pid, { show_sidebar_editor: false }));
  }, [active, dispatch, pluginId, pid]);

  editor.isSidebarOpen = showEditor && active;

  return editor.isSidebarOpen ? (
    <SidebarPopup open={true}>
      <PluginEditor {...props} />
    </SidebarPopup>
  ) : (
    ''
  );
};

export default SidebarEditor;
