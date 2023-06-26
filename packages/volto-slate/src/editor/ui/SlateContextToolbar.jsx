import React from 'react';
import Toolbar from './Toolbar';

// A toolbar that conditionally renders itself based on the presense of
// children
export default function SlateContextToolbar({ editor, plugins, show }) {
  if (!show) {
    return null;
  }

  const components = plugins.map((plug) => plug(editor)).filter((c) => !!c);
  return components.length ? <Toolbar>{components}</Toolbar> : '';
}
