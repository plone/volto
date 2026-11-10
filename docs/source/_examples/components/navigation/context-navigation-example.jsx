import React from 'react';
import ContextNavigation from '@plone/volto/components/theme/Navigation/ContextNavigation';

const MyNavigationComponent = (props) => {
  return (
    <div className="navigation-container">
      <h2>Context Navigation Examples</h2>
      
      {/* Basic usage with includeTop */}
      <div className="nav-section">
        <h3>With Top Level Included</h3>
        <ContextNavigation params={{ includeTop: true }} />
      </div>

      {/* Current folder only */}
      <div className="nav-section">
        <h3>Current Folder Only</h3>
        <ContextNavigation params={{ currentFolderOnly: true }} />
      </div>

      {/* Custom path with advanced parameters */}
      <div className="nav-section">
        <h3>Custom Section Navigation</h3>
        <ContextNavigation 
          pathname="/my-section" 
          params={{ 
            currentFolderOnly: true,
            topLevel: 1,
            bottomLevel: 3,
            no_icons: false,
            no_thumbs: true
          }} 
        />
      </div>

      {/* Navigation with specific root path */}
      <div className="nav-section">
        <h3>Navigation with Root Path</h3>
        <ContextNavigation 
          params={{ 
            name: "Site Navigation",
            root_path: "/content",
            includeTop: true,
            topLevel: 0,
            bottomLevel: 2
          }} 
        />
      </div>
    </div>
  );
};

export default MyNavigationComponent; 