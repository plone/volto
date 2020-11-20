/**
 * Edit html block.
 * @module components/manage/Blocks/HTML/Edit
 */

import { compose } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import { Button, Popup } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { withLoadables } from '@plone/volto/helpers';

import { Icon } from '@plone/volto/components';
import showSVG from '@plone/volto/icons/show.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import codeSVG from '@plone/volto/icons/code.svg';
import indentSVG from '@plone/volto/icons/indent.svg';

const messages = defineMessages({
  source: {
    id: 'Source',
    defaultMessage: 'Source',
  },
  preview: {
    id: 'Preview',
    defaultMessage: 'Preview',
  },
  placeholder: {
    id: '<p>Add some HTML here</p>',
    defaultMessage: '<p>Add some HTML here</p>',
  },
  prettier: {
    id: 'Prettify your code',
    defaultMessage: 'Prettify your code',
  },
  clear: {
    id: 'Clear',
    defaultMessage: 'Clear',
  },
  code: {
    id: 'Code',
    defaultMessage: 'Code',
  },
});

/**
 * Edit html block class.
 * @class Edit
 * @extends Component
 */
class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    block: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    onChangeBlock: PropTypes.func.isRequired,
    onSelectBlock: PropTypes.func.isRequired,
    onDeleteBlock: PropTypes.func.isRequired,
    handleKeyDown: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   */
  constructor(props) {
    super(props);
    this.state = {
      code: this.props.data.html || '',
      isPreview: false,
    };
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onPreview = this.onPreview.bind(this);
    this.onCodeEditor = this.onCodeEditor.bind(this);

    this.prettier = this.props['prettier/standalone'];
    this.parserHtml = this.props['prettier/parser-html'];
    this.prismCore = this.props['prismjs/components/prism-core'];

    // console.log(this.prismCore.current);
  }

  /**
   * Component will receive props
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.selected) {
      this.codeEditor._input.focus();
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
      this.codeEditor._input.focus();
    }
  }

  /**
   * Change html handler
   * @method onChangeCode
   * @param {string} code New value html
   * @returns {undefined}
   */
  onChangeCode(code) {
    this.props.onChangeBlock(this.props.block, {
      ...this.props.data,
      html: code,
    });
    this.setState({ code });
  }

  /**
   * Preview mode handler
   * @method onPreview
   * @returns {undefined}
   */
  onPreview() {
    this.setState({
      isPreview: !this.state.isPreview,
      code: this.prettier.current
        .format(this.state.code, {
          parser: 'html',
          plugins: [this.parserHtml.current],
        })
        .trim(),
    });
  }

  /**
   * Prettify handler
   * @method onPrettify
   * @returns {undefined}
   */

  onPrettify = () => {
    this.setState({
      code: this.prettier.current
        .format(this.state.code, {
          parser: 'html',
          plugins: [this.parserHtml.current],
        })
        .trim(),
    });
  };

  /**
   * Code Editor mode handler
   * @method onPreview
   * @returns {undefined}
   */
  onCodeEditor() {
    this.setState({ isPreview: !this.state.isPreview });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const placeholder =
      this.props.data.placeholder ||
      this.props.intl.formatMessage(messages.placeholder);
    return (
      <>
        {this.props.selected && !!this.state.code && (
          <div className="toolbar">
            <Popup
              trigger={
                <Button
                  icon
                  basic
                  aria-label={this.props.intl.formatMessage(messages.source)}
                  active={!this.state.isPreview}
                  onClick={this.onCodeEditor}
                >
                  <Icon name={codeSVG} size="24px" />
                </Button>
              }
              position="top center"
              content={this.props.intl.formatMessage(messages.code)}
              size="mini"
            />
            <Popup
              trigger={
                <Button
                  icon
                  basic
                  aria-label={this.props.intl.formatMessage(messages.preview)}
                  active={this.state.isPreview}
                  onClick={this.onPreview}
                >
                  <Icon name={showSVG} size="24px" />
                </Button>
              }
              position="top center"
              content={this.props.intl.formatMessage(messages.preview)}
              size="mini"
            />
            <Popup
              trigger={
                <Button
                  icon
                  basic
                  aria-label={this.props.intl.formatMessage(messages.prettier)}
                  onClick={this.onPrettify}
                >
                  <Icon name={indentSVG} size="24px" />
                </Button>
              }
              position="top center"
              content={this.props.intl.formatMessage(messages.prettier)}
              size="mini"
            />
            <div className="separator" />
            <Popup
              trigger={
                <Button.Group>
                  <Button icon basic onClick={() => this.onChangeCode('')}>
                    <Icon name={clearSVG} size="24px" color="#e40166" />
                  </Button>
                </Button.Group>
              }
              position="top center"
              content={this.props.intl.formatMessage(messages.clear)}
              size="mini"
            />
          </div>
        )}
        {this.state.isPreview && (
          <div dangerouslySetInnerHTML={{ __html: this.state.code }} />
        )}
        {!this.state.isPreview && (
          <Editor
            value={this.state.code}
            placeholder={placeholder}
            onValueChange={(code) => this.onChangeCode(code)}
            highlight={
              this.prismCore.current?.highlight &&
              this.prismCore.current?.languages
                ? (code) =>
                    this.prismCore.current.highlight(
                      code,
                      this.prismCore.current.languages.html,
                    )
                : () => {}
            }
            padding={8}
            className="html-editor"
            ref={(node) => {
              this.codeEditor = node;
            }}
          />
        )}
      </>
    );
  }
}

export default compose(
  withLoadables([
    'prettier/standalone',
    'prettier/parser-html',
    'prismjs/components/prism-core',
    'prismjs/components/prism-markup',
  ]),
  injectIntl,
)(Edit);
