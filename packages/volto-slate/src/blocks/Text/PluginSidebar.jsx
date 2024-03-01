import React from 'react';
import { createPortal } from 'react-dom';

const PluginSidebar = ({ children, selected }) => {
  return (
    <>
      {selected &&
        __CLIENT__ &&
        createPortal(
          <>{children}</>,
          document.getElementById('slate-plugin-sidebar'),
        )}
    </>
  );
};

export default PluginSidebar;
