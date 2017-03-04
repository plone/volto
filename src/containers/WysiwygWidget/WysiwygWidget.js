/**
 * WysiwygEditor container.
 * @module containers/WysiwygEditor
 */

import React, { PropTypes, Component } from 'react';
import Editor from 'draft-js-editor';
import { stateToHTML } from 'draft-js-export-html';
import { convertFromHTML, EditorState, ContentState } from 'draft-js';

/**
 * WysiwygEditor container class.
 * @class WysiwygEditor
 * @extends Component
 */
export default class WysiwygEditor extends Component {

  constructor(props) {
    super(props);

    let editorState;

    if (props.value) {
      const blocksFromHTML = convertFromHTML(props.value);
      const contentState = ContentState.createFromBlockArray(blocksFromHTML);
      editorState = EditorState.createWithContent(contentState);
    }
    else {
      editorState = EditorState.createEmpty();
    }

    this.state = { editorState };
  }

  /**
   * Change handler
   * @method onChange
   * @param {object} editorState Editor state.
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
          onChange={::this.onChange}
          editorState={this.state.editorState}
        />
      </div>
    );
  }
}
