import React from 'react';
import { Portal } from 'react-portal';

const PluginSidebar = ({ children, selected }) => {
  return (
    <>
      {selected && (
        <Portal
          node={__CLIENT__ && document.getElementById('slate-plugin-sidebar')}
        >
          {children}
        </Portal>
      )}
    </>
  );
};

export default PluginSidebar;
