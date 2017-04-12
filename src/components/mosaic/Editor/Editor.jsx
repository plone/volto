/**
 * Editor component.
 * @module components/Editor
 */

import { Editor as DraftEditor } from 'draft-js';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    setContent: PropTypes.func.isRequired,
  };

  /**
   * Construcor
   * @param {Object} props Properties.
   * @constructs
   */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

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
        onChange={this.onChange}
      />
    );
  }
}
