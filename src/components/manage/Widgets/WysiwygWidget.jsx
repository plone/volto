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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.shape({
      'content-type': PropTypes.string,
      data: PropTypes.string,
      encoding: PropTypes.string,
    }),
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    value: {
      'content-type': 'text/html',
      data: '',
      encoding: 'utf8',
    },
    error: null,
  }

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    if (!__SERVER__) {
      let editorState;
      if (props.value.data) {
        const blocksFromHTML = convertFromHTML(props.value.data);
        const contentState = ContentState.createFromBlockArray(blocksFromHTML);
        editorState = EditorState.createWithContent(contentState);
      } else {
        editorState = EditorState.createEmpty();
      }
      this.state = { editorState };
    }

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
    this.props.onChange(
      this.props.id,
      {
        'content-type': this.props.value['content-type'],
        encoding: this.props.value.encoding,
        data: stateToHTML(editorState.getCurrentContent()),
      },
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { id, title, description, required, value, error } = this.props;

    if (__SERVER__) {
      return (
        <textarea
          id={id}
          name={id}
          value={value.data}
          onChange={({ target }) => this.props.onChange(target.value === '' ? undefined : target.value)}
        />
      );
    }
    return (
      <div className={`field${error ? ' error' : ''}`}>
        <label htmlFor={`field-${id}`} className="horizontal">
          {title}
          {description && <span className="formHelp">{description}</span>}
          {required && <span className="required horizontal" title="Required">&nbsp;</span>}
        </label>
        {error && <div className="fieldErrorBox">{error}</div>}
        <div className="wysiwyg-widget">
          <Editor
            id={`field-${id}`}
            onChange={this.onChange}
            editorState={this.state.editorState}
          />
        </div>
      </div>
    );
  }
}
