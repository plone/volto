/**
 * Editor component.
 * @module components/Editor
 */

import { Editor as DraftEditor } from 'draft-js';

import React, { Component, PropTypes } from 'react';

/**
 * Editor component class.
 * @class Editor
 * @extends Component
 */
export default class Editor extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    content: PropTypes.object.isRequired,
    setContent: PropTypes.func.isRequired,
  };

  /**
   * On change handler.
   * @method onChange
   * @param {Object} content Editor content.
   * @returns {undefined}
   */
  onChange(content) {
    this.props.setContent(content);
  }

  /**
   * Render method.
   * @function render
   * @returns {string} Markup of the component.
   */
  render() {
    return (
      <DraftEditor
        editorState={this.props.content}
        onChange={::this.onChange}
      />
    );
  }
}

export default Editor;
