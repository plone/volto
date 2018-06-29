/**
 * Add link form.
 * @module components/manage/AnchorPlugin/components/LinkButton/AddLinkForm
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import unionClassNames from 'union-class-names';
import EditorUtils from 'draft-js-plugins-utils';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { map } from 'lodash';

import { resetSearchContent, searchContent } from '../../../../../actions';
import URLUtils from '../../utils/URLUtils';

@connect(
  state => ({
    search: state.search.items,
  }),
  dispatch =>
    bindActionCreators({ resetSearchContent, searchContent }, dispatch),
)
/**
 * Add link form class.
 * @class AddLinkForm
 * @extends Component
 */
export default class AddLinkForm extends Component {
  static propTypes = {
    getEditorState: PropTypes.func.isRequired,
    setEditorState: PropTypes.func.isRequired,
    onOverrideContent: PropTypes.func.isRequired,
    theme: PropTypes.objectOf(PropTypes.any).isRequired,
    placeholder: PropTypes.string,
    resetSearchContent: PropTypes.func.isRequired,
    searchContent: PropTypes.func.isRequired,
    search: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
  };

  static defaultProps = {
    placeholder: 'Enter a URL and press enter',
    search: [],
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      isInvalid: false,
    };
    this.onRef = this.onRef.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.input.focus();
    this.props.resetSearchContent();
  }

  /**
   * Ref handler
   * @method onRef
   * @param {Object} node Node
   * @returns {undefined}
   */
  onRef(node) {
    this.input = node;
  }

  /**
   * Change handler
   * @method onChange
   * @param {Object} value Value
   * @returns {undefined}
   */
  onChange({ target: { value } }) {
    const nextState = { value };
    if (this.state.isInvalid && URLUtils.isUrl(URLUtils.normalizeUrl(value))) {
      nextState.isInvalid = false;
    }
    this.setState(nextState);
    if (value && value !== '') {
      this.props.searchContent('', {
        Title: `*${value}*`,
      });
    } else {
      this.props.resetSearchContent();
    }
  }

  /**
   * Select item handler
   * @method onSelectItem
   * @param {string} url Url
   * @returns {undefined}
   */
  onSelectItem(url) {
    this.setState({
      value: url,
      isInvalid: false,
    });
    this.props.resetSearchContent();
    this.props.setEditorState(
      EditorUtils.createLinkAtSelection(this.props.getEditorState(), url),
    );
    this.input.blur();
    this.onClose();
  }

  /**
   * Close handler
   * @method onClose
   * @returns {undefined}
   */
  onClose() {
    return this.props.onOverrideContent(undefined);
  }

  /**
   * Keydown handler
   * @method onKeyDown
   * @param {Object} e Event object
   * @returns {undefined}
   */
  onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.onSubmit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      this.onClose();
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @returns {undefined}
   */
  onSubmit() {
    const { getEditorState, setEditorState } = this.props;
    let { value: url } = this.state;
    if (!URLUtils.isMail(URLUtils.normaliseMail(url))) {
      url = URLUtils.normalizeUrl(url);
      if (!URLUtils.isUrl(url)) {
        this.setState({ isInvalid: true });
        return;
      }
    } else {
      url = URLUtils.normaliseMail(url);
    }
    setEditorState(EditorUtils.createLinkAtSelection(getEditorState(), url));
    this.input.blur();
    this.onClose();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { theme, placeholder } = this.props;
    const { value, isInvalid } = this.state;
    const className = isInvalid
      ? unionClassNames(theme.input, theme.inputInvalid)
      : theme.input;

    return (
      <div>
        <input
          className={className}
          onBlur={this.onClose}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          placeholder={placeholder}
          ref={this.onRef}
          type="text"
          value={value}
        />
        <ul>
          {map(this.props.search, item => (
            <li onClick={this.onSelectItem.bind(this, item['@id'])}>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
