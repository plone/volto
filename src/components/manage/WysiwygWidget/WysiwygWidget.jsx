/**
 * WysiwygEditor container.
 * @module components/manage/WysiwygEditor/WysiwygEditor
 */

import React, { Component, PropTypes } from 'react';
import Editor from 'draft-js-editor';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromHTML, EditorState, ContentState } from 'draft-js';

/**
 * WysiwygEditor container class.
 * @class WysiwygEditor
 * @extends Component
 */
export default class WysiwygEditor extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    value: null,
  }

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    let editorState;

    if (props.value) {
      const blocksFromHTML = convertFromHTML(props.value);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState);
    } else {
      editorState = EditorState.createEmpty();
    }

    this.state = { editorState };
    this.onChange = this.onChange.bind(this);
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
   * @returns {undefined}
   */
  onChange(editorState) {
    this.setState({ editorState });
    this.props.onChange(stateToHTML(editorState.getCurrentContent()));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div className="wysiwyg-widget">
        <Editor
          onChange={this.onChange}
          editorState={this.state.editorState}
        />
      </div>
    );
  }
}
