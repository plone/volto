import React from 'react';
import SidebarEditor from './SidebarEditor';
import makeContextButtons from './ContextButtons';
import PluginEditor from './PluginEditor';
import {
  _insertElement,
  _unwrapElement,
  _isActiveElement,
  _getActiveElement,
} from './utils';
import messages from './messages';
import ToolbarButton from './ToolbarButton';
import SchemaProvider from './SchemaProvider';
import omit from 'lodash/omit';

import tagSVG from '@plone/volto/icons/tag.svg';

export const makeInlineElementPlugin = (options) => {
  const { elementType, isInlineElement, pluginId, title = 'Element' } = options;
  const omittedProps = [
    'pluginEditor',
    'getActiveElement',
    'unwrapElement',
    'schemaProvider',
    'hasValue',
    'elementType',
    'isInlineElement',
    'editSchema',
    'element',
    'persistentHelper',
  ];

  const pluginOptions = {
    pluginEditor: PluginEditor,
    insertElement: _insertElement(elementType),
    getActiveElement: _getActiveElement(elementType),
    isActiveElement: _isActiveElement(elementType),
    unwrapElement: _unwrapElement(elementType),
    messages,
    toolbarButtonIcon: tagSVG,
    title,
    extensions: [],

    // a component that should provide a schema as a render prop
    schemaProvider: SchemaProvider,
    // schema that can be used to create the edit form for this component
    // editSchema,

    // A generic "validation" method, just finds that a "positive" value
    // exists.  Plugin authors should overwrite it in options
    // If it returns true, the value is saved in the editor, othwerwise the
    // element type is removed from the editor
    hasValue: (data) => Object.values(data).findIndex((v) => !!v) > -1,

    ...options,
  };

  const PersistentHelper = (props) => (
    <SidebarEditor {...props} {...pluginOptions} />
  );
  PersistentHelper.id = pluginId;

  const ElementContextButtons = makeContextButtons(pluginOptions);
  ElementContextButtons.id = pluginId;

  const install = (config) => {
    const { slate } = config.settings;
    if (isInlineElement) {
      slate.inlineElements[elementType] = true;
    }

    slate.buttons[pluginId] = (props) => (
      <ToolbarButton
        {...props}
        title={title}
        {...omit(pluginOptions, omittedProps)}
      />
    );
    slate.contextToolbarButtons.push(ElementContextButtons);
    slate.persistentHelpers.push(
      options.persistentHelper
        ? options.persistentHelper(pluginOptions)
        : PersistentHelper,
    );
    slate.extensions = [
      ...(slate.extensions || []),
      ...pluginOptions.extensions,
    ];
    slate.elements[elementType] = options.element;
    slate.nodeTypesToHighlight.push(elementType);

    // The plugin authors should manually add the button to the relevant toolbars
    // slate.toolbarButtons = [...(slate.toolbarButtons || []), pluginId];
    // slate.expandedToolbarButtons = [...(slate.expandedToolbarButtons || []), pluginId];

    return config;
  };

  return [install, ElementContextButtons, PersistentHelper, pluginOptions];
};
